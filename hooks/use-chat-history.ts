"use client";

import { useEffect, useMemo } from "react";
import type { UIMessage } from "ai";

import {
    createConversation,
    getActiveConversationId,
    getConversation,
    setActiveConversationId,
    updateConversationMessages,
} from "@/lib/chat-history";
import { generateId } from "@/lib/utils";

type UseChatHistoryProps = {
    messages: UIMessage[];
};

export function useChatHistory({
                                   messages,
                               }: UseChatHistoryProps) {
    const conversationId = useMemo(() => {
        let id = getActiveConversationId();

        if (!id || !getConversation(id)) {
            id = generateId();

            createConversation({
                id,
                title: "New Chat",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                messages: [],
            });

            setActiveConversationId(id);
        }

        return id;
    }, []);

    useEffect(() => {
        updateConversationMessages(
            conversationId,
            messages
        );
    }, [conversationId, messages]);

    return {
        conversationId,
    };
}