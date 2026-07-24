"use client";

import type { ChatStatus, UIMessage } from "ai";

import ChatScroll from "@/components/chat/chat-scroll";
import AssistantMessage from "./assistant-message";
import UserMessage from "./user-message";
import TypingIndicator from "./typing-indicator";

type MessagesProps = {
    messages: UIMessage[];
    status: ChatStatus;
};

export default function Messages({
                                     messages,
                                     status,
                                 }: MessagesProps) {
    return (
        <ChatScroll>
            <div className="space-y-8 pb-10">

                {messages.map((message) => {
                    const content = message.parts
                        .filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("");

                    if (!content) return null;

                    return message.role === "user" ? (
                        <UserMessage
                            key={message.id}
                            content={content}
                        />
                    ) : (
                        <AssistantMessage
                            key={message.id}
                            content={content}
                        />
                    );
                })}

                {(status === "submitted" ||
                    status === "streaming") && (
                    <TypingIndicator />
                )}

            </div>
        </ChatScroll>
    );
}