"use client";

import type { ChatStatus, UIMessage } from "ai";

import EmptyState from "@/components/chat/empty-state";
import Messages from "@/components/chat/messages";

type ConversationProps = {
    messages: UIMessage[];
    status: ChatStatus;
};

export default function Conversation({
                                         messages,
                                         status,
                                     }: ConversationProps) {
    const isEmpty = messages.length === 0;

    return (
        <section className="flex min-h-0 flex-1 overflow-hidden">
            {isEmpty ? (
                <EmptyState />
            ) : (
                <div className="flex min-h-0 flex-1 overflow-y-auto">
                    <div className="container-chat flex w-full flex-col px-8 py-10">
                        <Messages
                            messages={messages}
                            status={status}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}