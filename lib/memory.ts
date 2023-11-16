/* eslint-disable no-console */
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Redis } from "@upstash/redis";

export type CelebKey = {
    celebName: string;
    modelName: string;
    userId: string;
};

export class MemoryManager {
    private static instance: MemoryManager;
    private history: Redis;
    private vectorDBClient: Pinecone;

    public constructor() {
        this.history = Redis.fromEnv();
        this.vectorDBClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
            environment: process.env.PINECONE_ENVIRONMENT!,
        });
    }


    public async vectorSearch(
        recentChatHistory: string,
        companionFileName: string
    ) {
        const pineconeClient = <Pinecone>this.vectorDBClient;

        const pineconeIndex = pineconeClient.Index(
            process.env.PINECONE_INDEX! || ""
        );

        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
            { pineconeIndex }
        );

        const similarDocs = await vectorStore
            .similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
            .catch((err) => console.log("WARNING: failed to get vector search results.", err));

        return similarDocs;
    }

    public static async getInstance(): Promise<MemoryManager> {
        if (!MemoryManager.instance) MemoryManager.instance = new MemoryManager();
        return MemoryManager.instance;
    }

    private generateRedisCelebKey(celebKey: CelebKey): string {
        return `${celebKey.celebName}-${celebKey.modelName}-${celebKey.userId}`;
    }

    public async writeToHistory(text: string, celebKey: CelebKey) {
        if (!celebKey || typeof celebKey.userId == "undefined") {
            console.log("Companion key set incorrectly");
            return "";
        }

        const key = this.generateRedisCelebKey(celebKey);

        const result = await this.history.zadd(key, {
            score: Date.now(),
            member: text,
        });

        return result;
    }

    public async readLatestHistory(celebKey: CelebKey): Promise<string> {
        if (!celebKey || typeof celebKey.userId == "undefined") {
            console.log("Companion key set incorrectly");
            return "";
        }

        const key = this.generateRedisCelebKey(celebKey);
        let result = await this.history.zrange(key, 0, Date.now(), {
            byScore: true,
        });

        result = result.slice(-30).reverse();
        const recentChats = result.reverse().join("\n");

        return recentChats;
    }

    public async seedChatHistory(
        seedContent: String,
        delimiter: string = "\n",
        celebKey: CelebKey
    ) {
        const key = this.generateRedisCelebKey(celebKey);

        if (await this.history.exists(key)) {
            console.log("User already has chat history");
            return;
        }

        const content = seedContent.split(delimiter);
        let counter = 0;

        for (const line of content) {
            await this.history.zadd(key, { score: counter, member: line });
            counter += 1;
        }
    }
}
