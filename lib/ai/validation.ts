// lib/ai/validation.ts

import { z } from "zod";

import {
    MAX_MESSAGES,
    MAX_MESSAGE_LENGTH,
    MAX_MESSAGE_ID_LENGTH,
} from "./constants";


export const MessageRoleSchema = z.enum([
    "user",
    "assistant",
]);


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