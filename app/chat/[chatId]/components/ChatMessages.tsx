import { ElementRef, useEffect, useRef, useState } from "react";

import { Celeb } from "@prisma/client";
import Message from "./Message";
import { MessageType } from "@/types/Chat";

interface props {
    messages: MessageType[];
    isLoading: boolean;
    celeb: Celeb
}

const ChatMessages: React.FC<props> = ({ messages, celeb, isLoading }) => {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [helloMessageLoading, setHelloMessageLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
        // Create a one second fake loading state for users with no chat history.
        const timeout = setTimeout(() => {
            setHelloMessageLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <Message
                isLoading={helloMessageLoading}
                src={celeb.src}
                role="system"
                content={`Hello, My name is ${celeb.name} ... I am a ${celeb.description}.`}
            />

            {messages.map((message) => (
                <Message
                    key={message.content}
                    src={celeb.src}
                    content={message.content}
                    role={message.role}
                />
            ))}

            {isLoading && (
                <Message
                    src={celeb.src}
                    role="system"
                    isLoading
                />
            )}

            <div ref={scrollRef} />
        </div>
    );
};

export default ChatMessages;