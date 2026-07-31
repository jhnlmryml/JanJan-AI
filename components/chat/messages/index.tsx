"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import type { ChatStatus, UIMessage } from "ai";

import ChatScroll from "@/components/chat/chat-scroll";
import UserMessage from "./user-message";
import TypingIndicator from "./typing-indicator";

const AssistantMessage = dynamic(
    () => import("./assistant-message"),
    {
        loading: () => null,
        ssr: false,
    }
);

type MessagesProps = {
    messages: UIMessage[];
    status: ChatStatus;
};

// Memoize MessageList to prevent full re-renders during high-frequency AI streaming
const MessageList = memo(function MessageList({ messages }: { messages: UIMessage[] }) {
    return (
        <>
            {messages.map((message) => {
                const content = Array.isArray(message.parts)
                    ? message.parts
                        .filter((part) => part.type === "text")
                        .map((part) => (part as { text: string }).text)
                        .join("")
                    : (message as unknown as { content?: string }).content || "";

                if (!content) return null;

                return message.role === "user" ? (
                    <UserMessage key={message.id} content={content} />
                ) : (
                    <AssistantMessage key={message.id} content={content} />
                );
            })}
        </>
    );
});

export default function Messages({ messages, status }: MessagesProps) {
    return (
        <ChatScroll>
            <div className="flex min-h-0 flex-col space-y-6">
                <MessageList messages={messages} />

                {(status === "submitted" || status === "streaming") && (
                    <TypingIndicator />
                )}
            </div>
        </ChatScroll>
    );
}