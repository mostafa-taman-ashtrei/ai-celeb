export interface MessageType {
    role: "system" | "user",
    content?: string;
    isLoading?: boolean;
    src?: string;
};