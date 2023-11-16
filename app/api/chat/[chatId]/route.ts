import { LangChainStream, StreamingTextResponse } from "ai";

import { CallbackManager } from "langchain/callbacks";
import { MemoryManager } from "@/lib/memory";
import { NextResponse } from "next/server";
import { Replicate } from "langchain/llms/replicate";
import { currentUser } from "@clerk/nextjs";
import dotenv from "dotenv";
import prismadb from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

dotenv.config({ path: `.env` });

interface paramsType {
    params: { chatId: string }
}

export const POST = async (request: Request, { params }: paramsType) => {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();

        if (!user || !user.username || !user.id) return new NextResponse("Unauthorized", { status: 401 });

        // **Check Rate Limit
        const identifier = request.url + "-" + user.id;
        const { success } = await rateLimit(identifier);

        if (!success) return new NextResponse("Rate limit exceeded", { status: 429 });


        // **Add Message To DB
        const celeb = await prismadb.celeb.update({
            where: { id: params.chatId },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id,
                    },
                },
            }
        });

        if (!celeb) return new NextResponse("Celeb not found", { status: 404 });


        // **Manage Chat in vector DB
        const name = celeb.id;
        const celebFileName = name + ".txt";

        const celebKey = {
            celebName: name,
            userId: user.id,
            modelName: "llama2-13b",
        };

        const memoryManager = await MemoryManager.getInstance();
        const records = await memoryManager.readLatestHistory(celebKey);

        if (records.length === 0) await memoryManager.seedChatHistory(celeb.seed, "\n\n", celebKey);

        await memoryManager.writeToHistory("User: " + prompt + "\n", celebKey);

        const recentChatHistory = await memoryManager.readLatestHistory(celebKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            celebFileName
        );

        //** Find any relevant information to make the bot smarter.
        let relevantHistory = "";
        if (!!similarDocs && similarDocs.length !== 0) relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");


        //** Call the Replicate API
        const { handlers } = LangChainStream();

        const replicateModel = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: { max_length: 2048 },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers),
        });

        replicateModel.verbose = true;

        const resp = String(
            await replicateModel
                .call(
                    `
                    ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${celeb.name}: prefix.
                    ${celeb.instructions}

                    Below are relevant details about ${celeb.name}'s past and the conversation you are in.
                    ${relevantHistory}

                    ${recentChatHistory}\n${celeb.name}:`
                )
                // eslint-disable-next-line no-console
                .catch(console.error)
        );

        //** Clean up the response string data
        const cleanedString = resp.replaceAll(",", "");
        const chunks = cleanedString.split("\n");
        const response = chunks[0];

        await memoryManager.writeToHistory("" + response.trim(), celebKey);

        var Readable = require("stream").Readable;
        let s = new Readable();
        s.push(response);
        s.push(null);

        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), celebKey);

            await prismadb.celeb.update({
                where: { id: params.chatId },
                data: {
                    messages: {
                        create: {
                            content: response.trim(),
                            role: "system",
                            userId: user.id,
                        },
                    },
                }
            });
        }

        return new StreamingTextResponse(s);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
};