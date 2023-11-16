"use client";

import { Celeb, Message } from "@prisma/client";
import { FormEvent, useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Header from "./Header";
import { MessageType } from "@/types/Chat";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";

interface props {
    celebData: Celeb & {
        messages: Message[];
        _count: { messages: number }
    };
}

const Chat: React.FC<props> = ({ celebData }) => {
    const router = useRouter();
    const [messages, setMessages] = useState<MessageType[]>(celebData.messages);

    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${celebData.id}`,
        onFinish(_prompt, completion) {
            const systemMessage: MessageType = {
                role: "system",
                content: completion
            };

            setMessages((prev) => [...prev, systemMessage]);

            setInput("");
            router.refresh();
        },
    });

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: MessageType = {
            role: "user",
            content: input
        };

        setMessages((prev) => [...prev, userMessage]);
        handleSubmit(e);
    };

    return (
        <div className="flex flex-col h-full p-4 space-y-1">
            <Header celebData={celebData} />

            <ChatMessages
                celeb={celebData}
                isLoading={isLoading}
                messages={messages}
            />

            <ChatInput
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmitForm}
            />
        </div>
    );
};

export default Chat;