"use client";

import React, {
    useEffect,
    useMemo,
    useRef,
} from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import Conversation from "@/components/chat/conversation";
import ChatInput from "@/components/chat/input/chat-input";
import { useChatStore } from "@/context/chat-context";

function getMessageText(
    message: Record<string, unknown>
): string {
    if (
        typeof message.content === "string" &&
        message.content
    ) {
        return message.content;
    }

    if (Array.isArray(message.parts)) {
        return message.parts
            .map((part) =>
                part &&
                typeof part === "object" &&
                "type" in part &&
                part.type === "text" &&
                "text" in part
                    ? String(part.text)
                    : ""
            )
            .join("");
    }

    return "";
}

// Keep transport stable so stop() and streaming
// behavior remain reliable.
const chatTransport = new DefaultChatTransport({
    api: "/api/chat",
});

export default function Chat() {
    const {
        activeChatId,
        activeChat,
        updateChatMessages,
        autoRenameCurrentChat,
    } = useChatStore();

    const activeChatIdRef = useRef(activeChatId);

    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);

    const initialMessages = useMemo(() => {
        return activeChat?.messages || [];
    }, [activeChatId]);

    const {
        messages,
        sendMessage,
        status,
        stop,
    } = useChat({
        id: activeChatId || undefined,
        messages: initialMessages,
        transport: chatTransport,
    });

    const hasMessages = messages.length > 0;

    const saveTimeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    // Save messages without constantly hammering localStorage
    // during streaming.
    useEffect(() => {
        const currentChatId = activeChatIdRef.current;

        if (!currentChatId || messages.length === 0) {
            return;
        }

        if (
            status === "streaming" ||
            status === "submitted"
        ) {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            saveTimeoutRef.current = setTimeout(() => {
                updateChatMessages(
                    currentChatId,
                    messages
                );
            }, 400);
        } else {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            updateChatMessages(
                currentChatId,
                messages
            );
        }

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [
        messages,
        status,
        updateChatMessages,
    ]);

    const handleStop = () => {
        stop();

        const currentChatId =
            activeChatIdRef.current;

        if (
            currentChatId &&
            messages.length > 0
        ) {
            updateChatMessages(
                currentChatId,
                messages
            );
        }
    };

    // Automatically rename the chat using the
    // first user message.
    useEffect(() => {
        if (
            activeChatId &&
            messages.length > 0 &&
            activeChat?.title === "New Chat"
        ) {
            const firstUserMessage =
                messages.find(
                    (message) =>
                        message.role === "user"
                );

            if (firstUserMessage) {
                const text = getMessageText(
                    firstUserMessage as unknown as Record<
                        string,
                        unknown
                    >
                );

                if (text) {
                    const capitalizedText =
                        text.charAt(0).toUpperCase() + text.slice(1);

                    autoRenameCurrentChat(
                        activeChatId,
                        capitalizedText
                    );

                    // autoRenameCurrentChat(
                    //     activeChatId,
                    //     text
                    // );
                }
            }
        }
    }, [
        activeChatId,
        messages,
        activeChat?.title,
        autoRenameCurrentChat,
    ]);

    return (
        <section
            className="
                chat-panel
                flex
                min-h-0
                min-w-0
                w-full
                flex-1
                flex-col
                overflow-hidden
                h-[100dvh]
                max-h-[100dvh]
                lg:h-screen
                lg:max-h-screen
            "
        >
            {/* Conversation is the ONLY area allowed to scroll */}
            <Conversation
                messages={messages}
                status={status}
            />

            {/* Input is always part of the viewport */}
            <div className="relative z-40 shrink-0">
                <ChatInput
                    status={status}
                    sendMessageAction={sendMessage}
                    hasMessages={hasMessages}
                    stopAction={handleStop}
                />
            </div>
        </section>
    );
}








// "use client";
//
// import React, { useEffect, useMemo, useRef } from "react";
// import { useChat } from "@ai-sdk/react";
// import { DefaultChatTransport } from "ai";
//
// import Conversation from "@/components/chat/conversation";
// import ChatInput from "@/components/chat/input/chat-input";
// import { useChatStore } from "@/context/chat-context";
//
// function getMessageText(message: Record<string, unknown>): string {
//     if (typeof message.content === "string" && message.content) {
//         return message.content;
//     }
//     if (Array.isArray(message.parts)) {
//         return message.parts
//             .map((part) =>
//                 part && typeof part === "object" && "type" in part && part.type === "text" && "text" in part
//                     ? String(part.text)
//                     : ""
//             )
//             .join("");
//     }
//     return "";
// }
//
// // Stable transport instance outside component to ensure AbortController works with stop()
// const chatTransport = new DefaultChatTransport({
//     api: "/api/chat",
// });
//
// export default function Chat() {
//     const { activeChatId, activeChat, updateChatMessages, autoRenameCurrentChat } = useChatStore();
//
//     // Ref to track activeChatId without causing extra re-render dependencies
//     const activeChatIdRef = useRef(activeChatId);
//     useEffect(() => {
//         activeChatIdRef.current = activeChatId;
//     }, [activeChatId]);
//
//     // Initial messages bound strictly to activeChatId
//     const initialMessages = useMemo(() => {
//         return activeChat?.messages || [];
//     }, [activeChatId]);
//
//     const {
//         messages,
//         sendMessage,
//         status,
//         stop,
//     } = useChat({
//         id: activeChatId || undefined,
//         messages: initialMessages,
//         transport: chatTransport,
//     });
//
//     const hasMessages = messages.length > 0;
//     const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//
//     // Save messages cleanly: debounced during active stream, immediate upon completion/stop
//     useEffect(() => {
//         const currentChatId = activeChatIdRef.current;
//         if (!currentChatId || messages.length === 0) return;
//
//         if (status === "streaming" || status === "submitted") {
//             // Debounce localStorage writes (400ms) during streaming to prevent thread freezing
//             if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//             saveTimeoutRef.current = setTimeout(() => {
//                 updateChatMessages(currentChatId, messages);
//             }, 400);
//         } else {
//             // Immediately sync full message set on completion
//             if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//             updateChatMessages(currentChatId, messages);
//         }
//
//         return () => {
//             if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
//         };
//     }, [messages, status, updateChatMessages]);
//
//     // Explicit stop action handler
//     const handleStop = () => {
//         stop();
//         if (activeChatIdRef.current && messages.length > 0) {
//             updateChatMessages(activeChatIdRef.current, messages);
//         }
//     };
//
//     // Auto-rename chat title based on first user prompt
//     useEffect(() => {
//         if (activeChatId && messages.length > 0 && activeChat?.title === "New Chat") {
//             const firstUserMessage = messages.find((m) => m.role === "user");
//             if (firstUserMessage) {
//                 const text = getMessageText(firstUserMessage as unknown as Record<string, unknown>);
//                 if (text) {
//                     autoRenameCurrentChat(activeChatId, text);
//                 }
//             }
//         }
//     }, [activeChatId, messages, activeChat?.title, autoRenameCurrentChat]);
//
//     return (
//         <section className="chat-panel flex max-h-screen h-screen flex-1 flex-col">
//             <Conversation
//                 messages={messages}
//                 status={status}
//             />
//
//             <ChatInput
//                 status={status}
//                 sendMessageAction={sendMessage}
//                 hasMessages={hasMessages}
//                 stopAction={handleStop}
//             />
//         </section>
//     );
// }