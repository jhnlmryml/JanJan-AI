"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
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
    hydrated: boolean;
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

/**
 * Creates a new chat session.
 *
 * IMPORTANT:
 * This function is only called after hydration or from user actions.
 * It is never called while rendering the initial server/client tree.
 */
const createNewSession = (): ChatSession => {
    const now = Date.now();

    return {
        id:
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : `chat_${now}_${Math.random().toString(36).slice(2, 7)}`,
        title: "New Chat",
        createdAt: now,
        updatedAt: now,
        messages: [],
    };
};

export function ChatStoreProvider({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    /*
     * IMPORTANT FOR HYDRATION:
     *
     * Do NOT read localStorage inside the initial state.
     *
     * Server and first client render must start with exactly
     * the same values.
     */
    const [chats, setChats] = useState<ChatSession[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [hydrated, setHydrated] = useState(false);

    /**
     * Restore localStorage only after the initial render.
     *
     * Server:
     *   chats = []
     *   activeChatId = null
     *   hydrated = false
     *
     * First client render:
     *   chats = []
     *   activeChatId = null
     *   hydrated = false
     *
     * Therefore hydration matches.
     */
    useEffect(() => {
        let cancelled = false;

        const loadChats = () => {
            try {
                const savedChats = localStorage.getItem(
                    CHATS_STORAGE_KEY
                );

                const savedActiveId = localStorage.getItem(
                    ACTIVE_CHAT_KEY
                );

                let parsedChats: ChatSession[] = [];

                if (savedChats) {
                    try {
                        const parsed = JSON.parse(savedChats);

                        if (Array.isArray(parsed)) {
                            parsedChats = parsed;
                        }
                    } catch (error) {
                        console.error(
                            "Failed to parse saved chats:",
                            error
                        );
                    }
                }

                /**
                 * No existing chats:
                 * create the first chat only on the client.
                 */
                if (parsedChats.length === 0) {
                    const newSession = createNewSession();

                    parsedChats = [newSession];

                    localStorage.setItem(
                        CHATS_STORAGE_KEY,
                        JSON.stringify(parsedChats)
                    );

                    localStorage.setItem(
                        ACTIVE_CHAT_KEY,
                        newSession.id
                    );
                }

                /**
                 * Restore active chat if it still exists.
                 * Otherwise use the first available chat.
                 */
                const validActiveId =
                    savedActiveId &&
                    parsedChats.some(
                        (chat) => chat.id === savedActiveId
                    )
                        ? savedActiveId
                        : parsedChats[0]?.id ?? null;

                if (validActiveId) {
                    localStorage.setItem(
                        ACTIVE_CHAT_KEY,
                        validActiveId
                    );
                }

                if (cancelled) return;

                setChats(parsedChats);
                setActiveChatId(validActiveId);
                setHydrated(true);
            } catch (error) {
                console.error(
                    "Failed to load chats from localStorage:",
                    error
                );

                if (cancelled) return;

                const fallbackSession = createNewSession();

                setChats([fallbackSession]);
                setActiveChatId(fallbackSession.id);
                setHydrated(true);

                try {
                    localStorage.setItem(
                        CHATS_STORAGE_KEY,
                        JSON.stringify([fallbackSession])
                    );

                    localStorage.setItem(
                        ACTIVE_CHAT_KEY,
                        fallbackSession.id
                    );
                } catch (storageError) {
                    console.error(
                        "Failed to save fallback chat:",
                        storageError
                    );
                }
            }
        };

        loadChats();

        return () => {
            cancelled = true;
        };
    }, []);

    /**
     * Helper to safely persist data to localStorage.
     */
    const saveChatsToStorage = useCallback(
        (
            updatedChats: ChatSession[],
            activeId?: string | null
        ) => {
            try {
                localStorage.setItem(
                    CHATS_STORAGE_KEY,
                    JSON.stringify(updatedChats)
                );

                if (
                    activeId !== undefined &&
                    activeId !== null
                ) {
                    localStorage.setItem(
                        ACTIVE_CHAT_KEY,
                        activeId
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to save chats to localStorage:",
                    error
                );
            }
        },
        []
    );

    const activeChat = chats.find(
        (chat) => chat.id === activeChatId
    );

    /**
     * Before hydration this is always false.
     *
     * This is important because the server and first client render
     * must produce the same result.
     */
    const hasActiveMessages =
        hydrated &&
        Boolean(
            activeChat &&
            activeChat.messages.length > 0
        );

    const createNewChat = useCallback(() => {
        const newSession = createNewSession();

        setChats((prevChats) => {
            const updatedChats = [
                newSession,
                ...prevChats,
            ];

            saveChatsToStorage(
                updatedChats,
                newSession.id
            );

            return updatedChats;
        });

        setActiveChatId(newSession.id);
    }, [saveChatsToStorage]);

    const selectChat = useCallback((id: string) => {
        setActiveChatId(id);

        try {
            localStorage.setItem(
                ACTIVE_CHAT_KEY,
                id
            );
        } catch (error) {
            console.error(
                "Failed to save active chat ID:",
                error
            );
        }
    }, []);

    const renameChat = useCallback(
        (id: string, newTitle: string) => {
            const cleanTitle = newTitle.trim();

            if (!cleanTitle) return;

            setChats((prevChats) => {
                const updatedChats = prevChats.map(
                    (chat) =>
                        chat.id === id
                            ? {
                                ...chat,
                                title: cleanTitle,
                                updatedAt: Date.now(),
                            }
                            : chat
                );

                saveChatsToStorage(updatedChats);

                return updatedChats;
            });
        },
        [saveChatsToStorage]
    );

    const deleteChat = useCallback(
        (id: string) => {
            setChats((prevChats) => {
                const updatedChats = prevChats.filter(
                    (chat) => chat.id !== id
                );

                /**
                 * Always keep one empty chat available.
                 */
                if (updatedChats.length === 0) {
                    const freshSession = createNewSession();

                    saveChatsToStorage(
                        [freshSession],
                        freshSession.id
                    );

                    setActiveChatId(freshSession.id);

                    return [freshSession];
                }

                let nextActiveId = activeChatId;

                /**
                 * If the deleted chat was active,
                 * select the first remaining chat.
                 */
                if (id === activeChatId) {
                    nextActiveId =
                        updatedChats[0]?.id ?? null;

                    setActiveChatId(nextActiveId);
                }

                saveChatsToStorage(
                    updatedChats,
                    nextActiveId
                );

                return updatedChats;
            });
        },
        [activeChatId, saveChatsToStorage]
    );

    const updateChatMessages = useCallback(
        (id: string, messages: UIMessage[]) => {
            if (!id) return;

            setChats((prevChats) => {
                const targetIndex = prevChats.findIndex(
                    (chat) => chat.id === id
                );

                let autoTitle: string | null = null;

                /**
                 * Automatically generate a title from
                 * the first user message.
                 */
                if (messages.length > 0) {
                    const firstUserMsg = messages.find(
                        (message) =>
                            message.role === "user"
                    );

                    if (firstUserMsg) {
                        const rawContent = Array.isArray(
                            firstUserMsg.parts
                        )
                            ? firstUserMsg.parts
                                .filter(
                                    (part) =>
                                        part.type === "text"
                                )
                                .map(
                                    (part) => part.text
                                )
                                .join("")
                            : (
                            firstUserMsg as unknown as {
                                content?: string;
                            }
                        ).content || "";

                        const cleanText =
                            rawContent.trim();

                        if (cleanText) {
                            autoTitle =
                                cleanText.length > 28
                                    ? `${cleanText.slice(
                                        0,
                                        28
                                    )}...`
                                    : cleanText;
                        }
                    }
                }

                let updatedChats: ChatSession[];

                /**
                 * Existing chat.
                 */
                if (targetIndex !== -1) {
                    updatedChats = prevChats.map(
                        (chat) => {
                            if (chat.id !== id) {
                                return chat;
                            }

                            const titleToUse =
                                (
                                    chat.title ===
                                    "New Chat" ||
                                    !chat.title
                                ) &&
                                autoTitle
                                    ? autoTitle
                                    : chat.title;

                            return {
                                ...chat,
                                messages,
                                title: titleToUse,
                                updatedAt: Date.now(),
                            };
                        }
                    );
                } else {
                    /**
                     * Chat doesn't exist yet.
                     * Create it using the supplied ID.
                     */
                    const now = Date.now();

                    const newSession: ChatSession = {
                        id,
                        title:
                            autoTitle || "New Chat",
                        createdAt: now,
                        updatedAt: now,
                        messages,
                    };

                    updatedChats = [
                        newSession,
                        ...prevChats,
                    ];
                }

                saveChatsToStorage(
                    updatedChats,
                    id
                );

                return updatedChats;
            });
        },
        [saveChatsToStorage]
    );

    const autoRenameCurrentChat = useCallback(
        (
            id: string,
            firstUserMessage: string
        ) => {
            const cleanText =
                firstUserMessage.trim();

            if (!cleanText) return;

            const generatedTitle =
                cleanText.length > 28
                    ? `${cleanText.slice(0, 28)}...`
                    : cleanText;

            setChats((prevChats) => {
                const target = prevChats.find(
                    (chat) => chat.id === id
                );

                if (
                    !target ||
                    (
                        target.title !==
                        "New Chat" &&
                        target.title !== ""
                    )
                ) {
                    return prevChats;
                }

                const updatedChats =
                    prevChats.map((chat) =>
                        chat.id === id
                            ? {
                                ...chat,
                                title: generatedTitle,
                                updatedAt: Date.now(),
                            }
                            : chat
                    );

                saveChatsToStorage(updatedChats);

                return updatedChats;
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
                hydrated,
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
        throw new Error(
            "useChatStore must be used within ChatStoreProvider"
        );
    }

    return context;
}

export const useChatContext = useChatStore;


















// "use client";
//
// import React, { createContext, useContext, useState, useCallback } from "react";
// import type { UIMessage } from "ai";
//
// export type ChatSession = {
//     id: string;
//     title: string;
//     createdAt: number;
//     updatedAt: number;
//     messages: UIMessage[];
// };
//
// type ChatContextType = {
//     chats: ChatSession[];
//     activeChatId: string | null;
//     activeChat: ChatSession | undefined;
//     hasActiveMessages: boolean;
//     createNewChat: () => void;
//     selectChat: (id: string) => void;
//     renameChat: (id: string, newTitle: string) => void;
//     deleteChat: (id: string) => void;
//     updateChatMessages: (id: string, messages: UIMessage[]) => void;
//     autoRenameCurrentChat: (id: string, firstUserMessage: string) => void;
// };
//
// const CHATS_STORAGE_KEY = "janjan_chat_sessions";
// const ACTIVE_CHAT_KEY = "janjan_active_chat_id";
//
// const ChatContext = createContext<ChatContextType | undefined>(undefined);
//
// const createNewSession = (): ChatSession => ({
//     id: typeof crypto !== "undefined" && crypto.randomUUID
//         ? crypto.randomUUID()
//         : `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
//     title: "New Chat",
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     messages: [],
// });
//
// // Lazy initializer to read from LocalStorage without triggering secondary renders in useEffect
// const loadInitialState = (): { chats: ChatSession[]; activeChatId: string | null } => {
//     if (typeof window === "undefined") {
//         const initialSession = createNewSession();
//         return { chats: [initialSession], activeChatId: initialSession.id };
//     }
//
//     try {
//         const savedChats = localStorage.getItem(CHATS_STORAGE_KEY);
//         const savedActiveId = localStorage.getItem(ACTIVE_CHAT_KEY);
//
//         let parsedChats: ChatSession[] = savedChats ? JSON.parse(savedChats) : [];
//
//         if (parsedChats.length === 0) {
//             const newSession = createNewSession();
//             parsedChats = [newSession];
//             localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(parsedChats));
//             localStorage.setItem(ACTIVE_CHAT_KEY, newSession.id);
//             return { chats: parsedChats, activeChatId: newSession.id };
//         }
//
//         const validActiveId =
//             savedActiveId && parsedChats.some((c) => c.id === savedActiveId)
//                 ? savedActiveId
//                 : parsedChats[0].id;
//
//         localStorage.setItem(ACTIVE_CHAT_KEY, validActiveId);
//         return { chats: parsedChats, activeChatId: validActiveId };
//     } catch (error) {
//         console.error("Failed to load chats from localStorage:", error);
//         const fallbackSession = createNewSession();
//         return { chats: [fallbackSession], activeChatId: fallbackSession.id };
//     }
// };
//
// export function ChatStoreProvider({ children }: { children: React.ReactNode }) {
//     // Single lazy state initializer prevents react-hooks/set-state-in-effect error
//     const [state, setState] = useState(loadInitialState);
//
//     const { chats, activeChatId } = state;
//
//     // Helper to safely persist data to localStorage
//     const saveChatsToStorage = useCallback((updatedChats: ChatSession[], activeId?: string | null) => {
//         try {
//             localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updatedChats));
//             if (activeId !== undefined && activeId !== null) {
//                 localStorage.setItem(ACTIVE_CHAT_KEY, activeId);
//             }
//         } catch (error) {
//             console.error("Failed to save chats to localStorage:", error);
//         }
//     }, []);
//
//     const activeChat = chats.find((c) => c.id === activeChatId);
//     const hasActiveMessages = Boolean(activeChat && activeChat.messages.length > 0);
//
//     const createNewChat = useCallback(() => {
//         const newSession = createNewSession();
//
//         setState((prev) => {
//             const updatedChats = [newSession, ...prev.chats];
//             saveChatsToStorage(updatedChats, newSession.id);
//             return { chats: updatedChats, activeChatId: newSession.id };
//         });
//     }, [saveChatsToStorage]);
//
//     const selectChat = useCallback((id: string) => {
//         setState((prev) => ({ ...prev, activeChatId: id }));
//         try {
//             localStorage.setItem(ACTIVE_CHAT_KEY, id);
//         } catch (e) {
//             console.error("Failed to save active chat ID:", e);
//         }
//     }, []);
//
//     const renameChat = useCallback(
//         (id: string, newTitle: string) => {
//             setState((prev) => {
//                 const updated = prev.chats.map((c) =>
//                     c.id === id ? { ...c, title: newTitle, updatedAt: Date.now() } : c
//                 );
//                 saveChatsToStorage(updated);
//                 return { ...prev, chats: updated };
//             });
//         },
//         [saveChatsToStorage]
//     );
//
//     const deleteChat = useCallback(
//         (id: string) => {
//             setState((prev) => {
//                 const updated = prev.chats.filter((c) => c.id !== id);
//
//                 if (updated.length === 0) {
//                     const freshSession = createNewSession();
//                     saveChatsToStorage([freshSession], freshSession.id);
//                     return { chats: [freshSession], activeChatId: freshSession.id };
//                 }
//
//                 let nextActiveId = prev.activeChatId;
//                 if (id === prev.activeChatId) {
//                     nextActiveId = updated[0].id;
//                 }
//
//                 saveChatsToStorage(updated, nextActiveId);
//                 return { chats: updated, activeChatId: nextActiveId };
//             });
//         },
//         [saveChatsToStorage]
//     );
//
//     const updateChatMessages = useCallback(
//         (id: string, messages: UIMessage[]) => {
//             if (!id) return;
//
//             setState((prev) => {
//                 const targetIndex = prev.chats.findIndex((c) => c.id === id);
//
//                 let autoTitle: string | null = null;
//                 if (messages.length > 0) {
//                     const firstUserMsg = messages.find((m) => m.role === "user");
//                     if (firstUserMsg) {
//                         const rawContent = Array.isArray(firstUserMsg.parts)
//                             ? firstUserMsg.parts.filter((p) => p.type === "text").map((p) => p.text).join("")
//                             : (firstUserMsg as unknown as { content?: string }).content || "";
//
//                         const cleanText = rawContent.trim();
//                         if (cleanText) {
//                             autoTitle = cleanText.length > 28 ? `${cleanText.slice(0, 28)}...` : cleanText;
//                         }
//                     }
//                 }
//
//                 let updated: ChatSession[];
//
//                 if (targetIndex !== -1) {
//                     updated = prev.chats.map((c) => {
//                         if (c.id === id) {
//                             const titleToUse =
//                                 (c.title === "New Chat" || !c.title) && autoTitle ? autoTitle : c.title;
//                             return {
//                                 ...c,
//                                 messages,
//                                 title: titleToUse,
//                                 updatedAt: Date.now(),
//                             };
//                         }
//                         return c;
//                     });
//                 } else {
//                     const newSession: ChatSession = {
//                         id,
//                         title: autoTitle || "New Chat",
//                         createdAt: Date.now(),
//                         updatedAt: Date.now(),
//                         messages,
//                     };
//                     updated = [newSession, ...prev.chats];
//                 }
//
//                 saveChatsToStorage(updated, id);
//                 return { ...prev, chats: updated };
//             });
//         },
//         [saveChatsToStorage]
//     );
//
//     const autoRenameCurrentChat = useCallback(
//         (id: string, firstUserMessage: string) => {
//             const cleanText = firstUserMessage.trim();
//             if (!cleanText) return;
//
//             const generatedTitle =
//                 cleanText.length > 28 ? `${cleanText.slice(0, 28)}...` : cleanText;
//
//             setState((prev) => {
//                 const target = prev.chats.find((c) => c.id === id);
//                 if (!target || (target.title !== "New Chat" && target.title !== "")) return prev;
//
//                 const updated = prev.chats.map((c) =>
//                     c.id === id ? { ...c, title: generatedTitle, updatedAt: Date.now() } : c
//                 );
//                 saveChatsToStorage(updated);
//                 return { ...prev, chats: updated };
//             });
//         },
//         [saveChatsToStorage]
//     );
//
//     return (
//         <ChatContext.Provider
//             value={{
//                 chats,
//                 activeChatId,
//                 activeChat,
//                 hasActiveMessages,
//                 createNewChat,
//                 selectChat,
//                 renameChat,
//                 deleteChat,
//                 updateChatMessages,
//                 autoRenameCurrentChat,
//             }}
//         >
//             {children}
//         </ChatContext.Provider>
//     );
// }
//
// export function useChatStore() {
//     const context = useContext(ChatContext);
//     if (!context) {
//         throw new Error("useChatStore must be used within a ChatStoreProvider");
//     }
//     return context;
// }
//
// export const useChatContext = useChatStore;