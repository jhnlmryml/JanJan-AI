"use client";

import { useMemo, useState } from "react";

import type { Conversation } from "@/lib/chat-history";

export function useChatSearch(
    conversations: Conversation[]
) {
    const [query, setQuery] = useState("");

    const filteredConversations = useMemo(() => {
        const search = query.trim().toLowerCase();

        if (!search) {
            return conversations;
        }

        return conversations.filter((conversation) => {
            if (
                conversation.title
                    .toLowerCase()
                    .includes(search)
            ) {
                return true;
            }

            return conversation.messages.some((message) => {
                const text = message.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("")
                    .toLowerCase();

                return text.includes(search);
            });
        });
    }, [query, conversations]);

    return {
        query,
        setQuery,
        filteredConversations,
        hasResults:
            filteredConversations.length > 0,
    };
}