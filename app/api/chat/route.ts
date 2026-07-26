import {
    convertToModelMessages,
    createUIMessageStreamResponse,
    streamText,
    toUIMessageStream,
    type UIMessage,
} from "ai";
import { groq } from "@ai-sdk/groq";

import {
    AI_MAX_DURATION,
    AI_MODEL,
    AI_TEMPERATURE,
} from "@/lib/ai/constants";
import {
    ChatRequestSchema,
} from "@/lib/ai/validation";
import {
    sanitizeMessages,
} from "@/lib/ai/sanitize";
import {
    badRequest,
    internalServerError,
    payloadTooLarge,
    serviceUnavailable,
} from "@/lib/ai/errors";
import {
    SYSTEM_PROMPT,
} from "@/lib/ai/system-prompt";

export const runtime = "edge";
export const maxDuration = AI_MAX_DURATION;

export async function POST(req: Request) {
    try {
        const body: unknown = await req.json();

        const parsed = ChatRequestSchema.safeParse(body);

        if (!parsed.success) {
            console.error(
                "Chat validation failed:",
                parsed.error.issues
            );

            return badRequest("Invalid request payload.");
        }

        let messages: UIMessage[];

        try {
            messages = sanitizeMessages(
                parsed.data.messages
            ) as UIMessage[];
        } catch (error) {
            console.error(error);

            return payloadTooLarge(
                "Conversation exceeds the maximum allowed size."
            );
        }

        let result;

        try {
            result = streamText({
                model: groq(AI_MODEL),
                system: SYSTEM_PROMPT,
                messages: await convertToModelMessages(
                    messages
                ),
                temperature: AI_TEMPERATURE,
            });
        } catch (error) {
            console.error(error);

            return serviceUnavailable(
                "AI service is temporarily unavailable."
            );
        }

        return createUIMessageStreamResponse({
            stream: toUIMessageStream({
                stream: result.stream,
            }),
        });
    } catch (error) {
        console.error(error);

        return internalServerError();
    }
}