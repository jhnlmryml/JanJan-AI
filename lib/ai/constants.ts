// lib/ai/constants.ts

import {Compass, PenTool, Smile, Sparkles} from "lucide-react";

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


// Direct, self-contained prompts ready for an immediate AI answer
export const SUGGESTIONS = [
    {
        icon: Sparkles,
        label: "Brainstorm Ideas",
        prompt: "Give me 5 creative ideas for a fun weekend activity or hobby.",
    },
    {
        icon: Compass,
        label: "Plan a Day Trip",
        prompt: "Help me create a relaxed 1-day itinerary for a fun day trip out of town.",
    },
    {
        icon: PenTool,
        label: "Write Something",
        prompt: "Write a short, friendly message thanking someone for their help today.",
    },
    {
        icon: Smile,
        label: "Fun Trivia",
        prompt: "Tell me an interesting fun fact that most people don't know about!",
    },
] as const;

// Animated rotating placeholders (Used ONLY on empty state)
export const PLACEHOLDERS = [
    "Ask Janjan anything...",
    "What's on your mind today?",
    "Spark a conversation with Janjan...",
    "Brainstorm, write, or ask a question...",
    "Need help with a project or idea?",
] as const;