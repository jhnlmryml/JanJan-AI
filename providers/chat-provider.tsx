"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { UIMessage } from "ai";

type ChatContextValue = {
    messages: UIMessage[];
    setMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;

    conversationId: string | null;
    setConversationId: React.Dispatch<
        React.SetStateAction<string | null>
    >;

    clearConversation: () => void;
};

const ChatContext = createContext<
    ChatContextValue | undefined
>(undefined);

type ChatProviderProps = {
    children: ReactNode;
};

export function ChatProvider({
                                 children,
                             }: ChatProviderProps) {
    const [messages, setMessages] = useState<UIMessage[]>([]);
    const [conversationId, setConversationId] =
        useState<string | null>(null);

    function clearConversation() {
        setMessages([]);
        setConversationId(null);
    }

    const value = useMemo(
        () => ({
            messages,
            setMessages,
            conversationId,
            setConversationId,
            clearConversation,
        }),
        [messages, conversationId]
    );

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatProvider() {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error(
            "useChatProvider must be used inside ChatProvider."
        );
    }

    return context;
}