"use client";

import { create } from "zustand";
import type { UIMessage } from "ai";

export type Conversation = {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    messages: UIMessage[];
};

type ChatStore = {
    conversations: Conversation[];
    activeConversationId: string | null;

    createConversation: () => string;

    setActiveConversation: (id: string) => void;

    deleteConversation: (id: string) => void;

    renameConversation: (
        id: string,
        title: string
    ) => void;

    updateMessages: (
        id: string,
        messages: UIMessage[]
    ) => void;

    clearConversations: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
    conversations: [],

    activeConversationId: null,

    createConversation() {
        const id = crypto.randomUUID();

        const conversation: Conversation = {
            id,
            title: "New Chat",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [],
        };

        set((state) => ({
            conversations: [conversation, ...state.conversations],
            activeConversationId: id,
        }));

        return id;
    },

    setActiveConversation(id) {
        set({
            activeConversationId: id,
        });
    },

    deleteConversation(id) {
        set((state) => {
            const conversations = state.conversations.filter(
                (conversation) => conversation.id !== id
            );

            return {
                conversations,
                activeConversationId:
                    state.activeConversationId === id
                        ? conversations[0]?.id ?? null
                        : state.activeConversationId,
            };
        });
    },

    renameConversation(id, title) {
        set((state) => ({
            conversations: state.conversations.map((conversation) =>
                conversation.id === id
                    ? {
                        ...conversation,
                        title,
                    }
                    : conversation
            ),
        }));
    },

    updateMessages(id, messages) {
        set((state) => ({
            conversations: state.conversations.map((conversation) =>
                conversation.id === id
                    ? {
                        ...conversation,
                        messages,
                        updatedAt: Date.now(),
                        title:
                            conversation.title === "New Chat" &&
                            messages.length > 0 &&
                            messages[0]?.role === "user"
                                ? messages[0].parts
                                    .filter((part) => part.type === "text")
                                    .map((part) => part.text)
                                    .join("")
                                    .slice(0, 40)
                                : conversation.title,
                    }
                    : conversation
            ),
        }));
    },

    clearConversations() {
        set({
            conversations: [],
            activeConversationId: null,
        });
    },
}));