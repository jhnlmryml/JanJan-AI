"use client";

import Logo from "@/components/chat/shared/logo";

export default function TypingIndicator() {
    return (
        <div className="fade-up flex items-center gap-3 sm:gap-4">
            <Logo size="sm" className="shrink-0" />

            <div className="message-ai flex items-center gap-1.5 rounded-2xl px-4 py-3.5 sm:px-5">
                <span className="typing-dot h-2 w-2 rounded-full bg-blue-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-blue-400" />
                <span className="typing-dot h-2 w-2 rounded-full bg-blue-400" />
            </div>
        </div>
    );
}