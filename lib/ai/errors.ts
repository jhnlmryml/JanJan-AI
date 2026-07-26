// lib/ai/errors.ts

import { JSON_HEADERS } from "./constants";

type ErrorResponse = {
    error: string;
    details?: unknown;
};

function json(
    body: ErrorResponse,
    status: number
): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: JSON_HEADERS,
    });
}

/**
 * 400 Bad Request
 */
export function badRequest(
    error = "Invalid request.",
    details?: unknown
): Response {
    return json(
        {
            error,
            details,
        },
        400
    );
}

/**
 * 413 Payload Too Large
 */
export function payloadTooLarge(
    error = "Request payload is too large."
): Response {
    return json({ error }, 413);
}

/**
 * 429 Too Many Requests
 */
export function tooManyRequests(
    error = "Too many requests. Please try again later."
): Response {
    return json({ error }, 429);
}

/**
 * 500 Internal Server Error
 */
export function internalServerError(
    error = "An unexpected server error occurred."
): Response {
    return json({ error }, 500);
}

/**
 * 503 Service Unavailable
 */
export function serviceUnavailable(
    error = "AI service is temporarily unavailable."
): Response {
    return json({ error }, 503);
}