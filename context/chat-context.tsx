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

    // Initial Load from localStorage
    useEffect(() => {
        try {
            const savedChats = localStorage.getItem(CHATS_STORAGE_KEY);
            const savedActiveId = localStorage.getItem(ACTIVE_CHAT_KEY);

            let parsedChats: ChatSession[] = [];
            if (savedChats) {
                parsedChats = JSON.parse(savedChats);
            }

            if (parsedChats.length === 0) {
                const newSession: ChatSession = {
                    id: crypto.randomUUID(),
                    title: "New Chat",
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    messages: [],
                };
                parsedChats = [newSession];
                localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(parsedChats));
                localStorage.setItem(ACTIVE_CHAT_KEY, newSession.id);
                setChats(parsedChats);
                setActiveChatId(newSession.id);
            } else {
                setChats(parsedChats);
                const validActiveId =
                    savedActiveId && parsedChats.some((c) => c.id === savedActiveId)
                        ? savedActiveId
                        : parsedChats[0].id;
                setActiveChatId(validActiveId);
                localStorage.setItem(ACTIVE_CHAT_KEY, validActiveId);
            }
        } catch (error) {
            console.error("Failed to load chats from localStorage:", error);
        }
    }, []);

    const saveChatsToStorage = useCallback((updatedChats: ChatSession[]) => {
        try {
            localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updatedChats));
        } catch (error) {
            console.error("Failed to save chats to localStorage:", error);
        }
    }, []);

    const activeChat = chats.find((c) => c.id === activeChatId);
    const hasActiveMessages = Boolean(activeChat && activeChat.messages.length > 0);

    const createNewChat = useCallback(() => {
        const newSession: ChatSession = {
            id: crypto.randomUUID(),
            title: "New Chat",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [],
        };

        setChats((prev) => {
            const updated = [newSession, ...prev];
            saveChatsToStorage(updated);
            return updated;
        });
        setActiveChatId(newSession.id);
        try {
            localStorage.setItem(ACTIVE_CHAT_KEY, newSession.id);
        } catch {}
    }, [saveChatsToStorage]);

    const selectChat = useCallback((id: string) => {
        setActiveChatId(id);
        try {
            localStorage.setItem(ACTIVE_CHAT_KEY, id);
        } catch {}
    }, []);

    const renameChat = useCallback(
        (id: string, newTitle: string) => {
            setChats((prev) => {
                const updated = prev.map((c) =>
                    c.id === id ? { ...c, title: newTitle, updatedAt: Date.now() } : c
                );
                saveChatsToStorage(updated);
                return updated;
            });
        },
        [saveChatsToStorage]
    );

    const deleteChat = useCallback(
        (id: string) => {
            setChats((prev) => {
                const updated = prev.filter((c) => c.id !== id);
                let nextActiveId = activeChatId;

                if (id === activeChatId) {
                    nextActiveId = updated.length > 0 ? updated[0].id : null;
                }

                if (updated.length === 0) {
                    const newSession: ChatSession = {
                        id: crypto.randomUUID(),
                        title: "New Chat",
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        messages: [],
                    };
                    saveChatsToStorage([newSession]);
                    setActiveChatId(newSession.id);
                    localStorage.setItem(ACTIVE_CHAT_KEY, newSession.id);
                    return [newSession];
                }

                saveChatsToStorage(updated);
                if (nextActiveId) {
                    setActiveChatId(nextActiveId);
                    localStorage.setItem(ACTIVE_CHAT_KEY, nextActiveId);
                }
                return updated;
            });
        },
        [activeChatId, saveChatsToStorage]
    );

    const updateChatMessages = useCallback(
        (id: string, messages: UIMessage[]) => {
            setChats((prev) => {
                const target = prev.find((c) => c.id === id);
                if (!target) return prev;

                if (
                    target.messages.length === messages.length &&
                    target.messages === messages
                ) {
                    return prev;
                }

                const updated = prev.map((c) =>
                    c.id === id ? { ...c, messages, updatedAt: Date.now() } : c
                );
                saveChatsToStorage(updated);
                return updated;
            });
        },
        [saveChatsToStorage]
    );

    const autoRenameCurrentChat = useCallback(
        (id: string, firstUserMessage: string) => {
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
                saveChatsToStorage(updated);
                return updated;
            });
        },
        [saveChatsToStorage]
    );

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
    if (!context) {
        throw new Error("useChatStore must be used within a ChatStoreProvider");
    }
    return context;
}

export const useChatContext = useChatStore;