"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { UIMessage } from "ai";

export type ChatSession = {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    messages: UIMessage[];
};

type ChatContextType = {
    chats: ChatSession[];
    activeChatId: string | null;
    activeChat: ChatSession | undefined;
    hasActiveMessages: boolean;
    createNewChat: () => void;
    selectChat: (id: string) => void;
    renameChat: (id: string, newTitle: string) => void;
    deleteChat: (id: string) => void;
    updateChatMessages: (id: string, messages: UIMessage[]) => void;
    autoRenameCurrentChat: (id: string, firstUserMessage: string) => void;
};

const CHATS_STORAGE_KEY = "janjan_chat_sessions";
const ACTIVE_CHAT_KEY = "janjan_active_chat_id";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatStoreProvider({ children }: { children: React.ReactNode }) {
    const [chats, setChats] = useState<ChatSession[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    // Initial Load from localStorage asynchronously to prevent cascading renders
    useEffect(() => {
        try {
            const savedChats = localStorage.getItem(CHATS_STORAGE_KEY);
            const savedActiveId = localStorage.getItem(ACTIVE_CHAT_KEY);

            let parsedChats: ChatSession[] = [];
            if (savedChats) {
                parsedChats = JSON.parse(savedChats);
            }

            if (parsedChats.length === 0) {
                const initialChat: ChatSession = {
                    id: `chat_${Date.now()}`,
                    title: "New Chat",
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    messages: [],
                };
                parsedChats = [initialChat];
            }

            const targetActiveId =
                savedActiveId && parsedChats.some((c) => c.id === savedActiveId)
                    ? savedActiveId
                    : parsedChats[0].id;

            requestAnimationFrame(() => {
                setChats(parsedChats);
                setActiveChatId(targetActiveId);
            });
        } catch (error) {
            console.error("Failed to restore chat sessions from localStorage", error);
        }
    }, []);

    const activeChat = chats.find((c) => c.id === activeChatId);
    const hasActiveMessages = Boolean(activeChat && activeChat.messages.length > 0);

    const createNewChat = useCallback(() => {
        const newId = `chat_${Date.now()}`;
        const newChat: ChatSession = {
            id: newId,
            title: "New Chat",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [],
        };

        setChats((prev) => {
            const updated = [newChat, ...prev];
            try {
                localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
        });

        setActiveChatId(newId);
        try {
            localStorage.setItem(ACTIVE_CHAT_KEY, newId);
        } catch {}
    }, []);

    const selectChat = useCallback((id: string) => {
        setActiveChatId(id);
        try {
            localStorage.setItem(ACTIVE_CHAT_KEY, id);
        } catch {}
    }, []);

    const renameChat = useCallback((id: string, newTitle: string) => {
        const cleanTitle = newTitle.trim();
        if (!cleanTitle) return;

        setChats((prev) => {
            const updated = prev.map((c) =>
                c.id === id ? { ...c, title: cleanTitle, updatedAt: Date.now() } : c
            );
            try {
                localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
        });
    }, []);

    const deleteChat = useCallback(
        (id: string) => {
            setChats((prev) => {
                const filtered = prev.filter((c) => c.id !== id);
                try {
                    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(filtered));
                } catch {}

                if (activeChatId === id) {
                    const nextId = filtered[0]?.id || null;
                    if (nextId) {
                        setActiveChatId(nextId);
                        try {
                            localStorage.setItem(ACTIVE_CHAT_KEY, nextId);
                        } catch {}
                    } else {
                        const freshId = `chat_${Date.now()}`;
                        const freshChat: ChatSession = {
                            id: freshId,
                            title: "New Chat",
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            messages: [],
                        };
                        const freshList = [freshChat];
                        try {
                            localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(freshList));
                            localStorage.setItem(ACTIVE_CHAT_KEY, freshId);
                        } catch {}
                        setActiveChatId(freshId);
                        return freshList;
                    }
                }

                return filtered;
            });
        },
        [activeChatId]
    );

    const updateChatMessages = useCallback((id: string, newMessages: UIMessage[]) => {
        setChats((prev) => {
            const existing = prev.find((c) => c.id === id);
            if (!existing) return prev;

            if (
                existing.messages.length === newMessages.length &&
                existing.messages[existing.messages.length - 1]?.id ===
                newMessages[newMessages.length - 1]?.id
            ) {
                return prev;
            }

            const updated = prev.map((c) =>
                c.id === id ? { ...c, messages: newMessages, updatedAt: Date.now() } : c
            );
            try {
                localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
        });
    }, []);

    const autoRenameCurrentChat = useCallback((id: string, firstUserMessage: string) => {
        const cleanText = firstUserMessage.trim();
        if (!cleanText) return;

        const generatedTitle =
            cleanText.length > 28 ? `${cleanText.slice(0, 28)}...` : cleanText;

        setChats((prev) => {
            const target = prev.find((c) => c.id === id);
            if (!target || (target.title !== "New Chat" && target.title !== "")) return prev;

            const updated = prev.map((c) =>
                c.id === id ? { ...c, title: generatedTitle, updatedAt: Date.now() } : c
            );
            try {
                localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
        });
    }, []);

    return (
        <ChatContext.Provider
            value={{
                chats,
                activeChatId,
                activeChat,
                hasActiveMessages,
                createNewChat,
                selectChat,
                renameChat,
                deleteChat,
                updateChatMessages,
                autoRenameCurrentChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatStore() {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChatStore must be used within ChatStoreProvider");
    return context;
}