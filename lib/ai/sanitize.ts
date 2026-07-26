// lib/ai/sanitize.ts

import type { ChatMessage } from "./validation";

import {
    MAX_CONTEXT_MESSAGES,
    MAX_TOTAL_CONTENT_LENGTH,
} from "./constants";

/**
 * Removes empty messages, trims whitespace,
 * limits context length, and validates
 * the total content size.
 */
export function sanitizeMessages(
    messages: ChatMessage[]
): ChatMessage[] {
    const cleaned = messages
        .map((message) => ({
            ...message,
            content: message.content?.trim() ?? "",
        }))
        .filter((message) => {
            const hasContent = message.content.length > 0;
            const hasParts =
                Array.isArray(message.parts) &&
                message.parts.length > 0;

            return hasContent || hasParts;
        });

    const recentMessages = cleaned.slice(-MAX_CONTEXT_MESSAGES);

    const totalLength = recentMessages.reduce(
        (total, message) => total + message.content.length,
        0
    );

    if (totalLength > MAX_TOTAL_CONTENT_LENGTH) {
        throw new Error(
            "Conversation exceeds the maximum allowed size."
        );
    }

    return recentMessages;
}