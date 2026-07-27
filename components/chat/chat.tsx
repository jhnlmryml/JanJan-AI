"use client";

import React, { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import Conversation from "@/components/chat/conversation";
import ChatInput from "@/components/chat/input/chat-input";
import { useChatStore } from "@/context/chat-context";

function getMessageText(message: Record<string, unknown>): string {
    if (typeof message.content === "string" && message.content) {
        return message.content;
    }
    if (Array.isArray(message.parts)) {
        return message.parts
            .map((part) =>
                part && typeof part === "object" && "type" in part && part.type === "text" && "text" in part
                    ? String(part.text)
                    : ""
            )
            .join("");
    }
    return "";
}

export default function Chat() {
    const { activeChatId, activeChat, updateChatMessages, autoRenameCurrentChat } = useChatStore();

    const {
        messages,
        sendMessage,
        status,
        stop,
    } = useChat({
        id: activeChatId || undefined,
        messages: activeChat?.messages || [],
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    const hasMessages = messages.length > 0;

    // Save messages to active chat session whenever messages update
    useEffect(() => {
        if (activeChatId) {
            updateChatMessages(activeChatId, messages);
        }
    }, [activeChatId, messages, updateChatMessages]);

    // Auto-rename chat title based on the first user prompt
    useEffect(() => {
        if (activeChatId && messages.length > 0 && activeChat?.title === "New Chat") {
            const firstUserMessage = messages.find((m) => m.role === "user");
            if (firstUserMessage) {
                const text = getMessageText(firstUserMessage as unknown as Record<string, unknown>);
                if (text) {
                    autoRenameCurrentChat(activeChatId, text);
                }
            }
        }
    }, [activeChatId, messages, activeChat?.title, autoRenameCurrentChat]);

    return (
        <section className="chat-panel flex max-h-screen h-screen flex-1 flex-col">
            <Conversation
                messages={messages}
                status={status}
            />

            <ChatInput
                status={status}
                sendMessageAction={sendMessage}
                hasMessages={hasMessages}
                stopAction={stop}
            />
        </section>
    );
}