import type { UIMessage } from "ai";

export type Role = "user" | "assistant" | "system";

export interface ChatPart {
    type: "text";
    text: string;
}

export interface ChatMessage {
    id: string;
    role: Role;
    parts: ChatPart[];
}

export interface Conversation {
    id: string;
    title: string;
    createdAt: string;
    updatedAt?: string;
}

export type ChatMessages = UIMessage[];