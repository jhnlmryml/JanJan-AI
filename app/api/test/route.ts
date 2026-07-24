import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function GET() {
    try {
        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            prompt: "Reply with only: Hello from Groq!",
        });

        return Response.json({
            success: true,
            text,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            {
                status: 500,
            }
        );
    }
}