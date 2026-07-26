// lib/ai/constants.ts

/**
 * AI Model
 */
export const AI_MODEL = "llama-3.3-70b-versatile" as const;

/**
 * Generation Settings
 */
export const AI_TEMPERATURE = 0.3;
export const AI_MAX_DURATION = 30;

/**
 * Conversation Limits
 */
export const MAX_MESSAGES = 50;
export const MAX_CONTEXT_MESSAGES = 15;

/**
 * Input Limits
 */
export const MAX_MESSAGE_LENGTH = 8_000;
export const MAX_TOTAL_CONTENT_LENGTH = 50_000;
export const MAX_MESSAGE_ID_LENGTH = 100;

/**
 * Response Headers
 */
export const JSON_HEADERS = {
    "Content-Type": "application/json",
} as const;