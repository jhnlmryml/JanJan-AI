"use client";

import type { UIMessage } from "ai";

export type TimeGroup = "Today" | "Yesterday" | "Previous 7 Days" | "Older";

export type ChatSession = {
    id: string;
    title: string;
    messages: UIMessage[];
    createdAt: number;
    updatedAt: number;
};

export type GroupedChats = {
    group: TimeGroup;
    chats: ChatSession[];
};

const STORAGE_CHATS_KEY = "janjan_chat_sessions_v1";
const STORAGE_ACTIVE_ID_KEY = "janjan_active_chat_id";

/**
 * Creates a default empty chat session
 */
export function createNewSession(title = "New Chat"): ChatSession {
    const now = Date.now();
    return {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `chat_${now}_${Math.random().toString(36).substring(2, 9)}`,
        title,
        messages: [],
        createdAt: now,
        updatedAt: now,
    };
}

/**
 * Safely loads chats from localStorage
 */
export function loadSessionsFromStorage(): ChatSession[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_CHATS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed as ChatSession[];
    } catch (error) {
        console.error("Failed to load chat sessions from localStorage:", error);
        return [];
    }
}

/**
 * Safely saves chat sessions to localStorage
 */
export function saveSessionsToStorage(sessions: ChatSession[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_CHATS_KEY, JSON.stringify(sessions));
    } catch (error) {
        console.error("Failed to save chat sessions to localStorage:", error);
    }
}

/**
 * Load active chat ID
 */
export function loadActiveIdFromStorage(): string | null {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
    } catch {
        return null;
    }
}

/**
 * Save active chat ID
 */
export function saveActiveIdToStorage(id: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_ACTIVE_ID_KEY, id);
    } catch {}
}

/**
 * Groups sessions by time periods (Today, Yesterday, Previous 7 Days, Older)
 */
export function groupSessionsByDate(sessions: ChatSession[]): GroupedChats[] {
    const sorted = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000; // 24 hours
    const startOf7Days = startOfToday - 86400000 * 6;

    const groups: Record<TimeGroup, ChatSession[]> = {
        Today: [],
        Yesterday: [],
        "Previous 7 Days": [],
        Older: [],
    };

    for (const session of sorted) {
        const time = session.updatedAt || session.createdAt;
        if (time >= startOfToday) {
            groups["Today"].push(session);
        } else if (time >= startOfYesterday) {
            groups["Yesterday"].push(session);
        } else if (time >= startOf7Days) {
            groups["Previous 7 Days"].push(session);
        } else {
            groups["Older"].push(session);
        }
    }

    const order: TimeGroup[] = ["Today", "Yesterday", "Previous 7 Days", "Older"];
    return order
        .map((group) => ({ group, chats: groups[group] }))
        .filter((item) => item.chats.length > 0);
}

// /**
//  * Generates an automated title snippet from initial user text message
//  */
// export function generateChatTitleFromMessages(messages: UIMessage[]): string | null {
//     const firstUserMsg = messages.find((m) => m.role === "user");
//     if (!firstUserMsg) return null;
//
//     let text = "";
//     if (Array.isArray(firstUserMsg.parts)) {
//         text = firstUserMsg.parts
//             .filter((p) => p.type === "text")
//             .map((p) => p.text)
//             .join(" ");
//     } else if (typeof (firstUserMsg as any).content === "string") {
//         text = (firstUserMsg as any).content;
//     }
//
//     const trimmed = text.trim();
//     if (!trimmed) return null;
//
//     const clean = trimmed.replace(/[\r\n]+/g, " ");
//     return clean.length > 32 ? `${clean.substring(0, 32)}...` : clean;
// }