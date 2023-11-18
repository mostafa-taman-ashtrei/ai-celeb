import { ChangeEvent, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";

interface props {
    input: string;
    // eslint-disable-next-line no-unused-vars
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    // eslint-disable-next-line no-unused-vars
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<props> = ({ input, handleInputChange, handleSubmit, isLoading }) => {
    return (
        <form onSubmit={handleSubmit} className="border-t border-primary/10 py-4 flex items-center gap-x-2">
            <Input
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                placeholder="Say something to break the ice 🧊"
                className="rounded-full bg-primary/10"
            />
            <Button disabled={isLoading} variant="ghost" size="icon" className="rounded-full">
                <SendHorizonal className="w-6 h-6 text-sky-600" />
            </Button>
        </form>
    );
};

export default ChatInput;