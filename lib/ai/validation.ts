// lib/ai/validation.ts

import { z } from "zod";

import {
    MAX_MESSAGES,
    MAX_MESSAGE_LENGTH,
    MAX_MESSAGE_ID_LENGTH,
} from "./constants";

/**
 * Supported message roles.
 *
 * We intentionally do NOT allow "system" because
 * only the server should provide the system prompt.
 */
export const MessageRoleSchema = z.enum([
    "user",
    "assistant",
]);

/**
 * AI SDK UIMessage validation.
 *
 * We keep `.passthrough()` so the AI SDK can include
 * additional fields without failing validation.
 */
export const MessageSchema = z.looseObject({
    id: z
        .string()
        .trim()
        .max(MAX_MESSAGE_ID_LENGTH)
        .optional(),

    role: MessageRoleSchema,

    content: z
        .string()
        .max(MAX_MESSAGE_LENGTH)
        .optional()
        .default(""),

    parts: z.array(z.unknown()).optional(),
});
/**
 * Chat request body.
 */
export const ChatRequestSchema = z.object({
    messages: z
        .array(MessageSchema)
        .min(1, "At least one message is required.")
        .max(
            MAX_MESSAGES,
            `Maximum ${MAX_MESSAGES} messages are allowed.`
        ),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatMessage = z.infer<typeof MessageSchema>;