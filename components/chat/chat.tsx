"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import Conversation from "@/components/chat/conversation";
import ChatInput from "@/components/chat/input/chat-input";

export default function Chat() {
    const {
        messages,
        sendMessage,
        status,
    } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    return (
        <section className="chat-panel flex max-h-screen h-screen flex-1 flex-col">
            <Conversation
                messages={messages}
                status={status}
            />

            <ChatInput
                status={status}
                sendMessageAction={sendMessage}
                hasMessages={messages.length > 0}
            />
        </section>
    );
}