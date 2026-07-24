import {
    DefaultChatTransport,
    type UIMessage,
} from "ai";

export const chatTransport = new DefaultChatTransport({
    api: "/api/chat",
});

export function createUserMessage(text: string): UIMessage {
    return {
        id: crypto.randomUUID(),
        role: "user",
        parts: [
            {
                type: "text",
                text,
            },
        ],
    };
}

export function extractText(message: UIMessage): string {
    return message.parts
        .filter(
            (
                part
            ): part is Extract<
                UIMessage["parts"][number],
                { type: "text" }
            > => part.type === "text"
        )
        .map((part) => part.text)
        .join("");
}

export function isAssistantMessage(
    message: UIMessage
) {
    return message.role === "assistant";
}

export function isUserMessage(
    message: UIMessage
) {
    return message.role === "user";
}