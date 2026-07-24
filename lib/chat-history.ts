import type { UIMessage } from "ai";

import { STORAGE_KEYS, storage } from "./storage";

export interface Conversation {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    messages: UIMessage[];
}

export function getConversations(): Conversation[] {
    return storage.get<Conversation[]>(
        STORAGE_KEYS.conversations,
        []
    );
}

export function saveConversations(
    conversations: Conversation[]
) {
    storage.set(
        STORAGE_KEYS.conversations,
        conversations
    );
}

export function getConversation(id: string) {
    return getConversations().find(
        (conversation) => conversation.id === id
    );
}

export function createConversation(
    conversation: Conversation
) {
    const conversations = getConversations();

    conversations.unshift(conversation);

    saveConversations(conversations);
}

export function updateConversation(
    id: string,
    data: Partial<Conversation>
) {
    const conversations = getConversations().map(
        (conversation) =>
            conversation.id === id
                ? {
                    ...conversation,
                    ...data,
                    updatedAt: Date.now(),
                }
                : conversation
    );

    saveConversations(conversations);
}

export function deleteConversation(id: string) {
    saveConversations(
        getConversations().filter(
            (conversation) => conversation.id !== id
        )
    );
}

export function renameConversation(
    id: string,
    title: string
) {
    updateConversation(id, {
        title,
    });
}

export function updateConversationMessages(
    id: string,
    messages: UIMessage[]
) {
    const current = getConversation(id);

    if (!current) return;

    updateConversation(id, {
        messages,
        title:
            current.title === "New Chat" &&
            messages.length > 0 &&
            messages[0].role === "user"
                ? messages[0].parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("")
                    .slice(0, 50)
                : current.title,
    });
}

export function getActiveConversationId() {
    return storage.get<string | null>(
        STORAGE_KEYS.activeConversation,
        null
    );
}

export function setActiveConversationId(
    id: string | null
) {
    if (!id) {
        storage.remove(STORAGE_KEYS.activeConversation);
        return;
    }

    storage.set(STORAGE_KEYS.activeConversation, id);
}