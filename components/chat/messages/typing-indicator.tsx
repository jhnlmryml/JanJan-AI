"use client";

import Logo from "@/components/chat/shared/logo";

export default function TypingIndicator() {
    return (
        <div className="fade-up flex items-start gap-5">

            <Logo />

            <div
                className="
          message-ai
          glass-dark
          flex
          items-center
          gap-2
          rounded-[28px]
          px-6
          py-5
        "
            >
        <span
            className="
            typing-dot
            h-2.5
            w-2.5
            rounded-full
            bg-blue-400
          "
        />

                <span
                    className="
            typing-dot
            h-2.5
            w-2.5
            rounded-full
            bg-blue-400
          "
                />

                <span
                    className="
            typing-dot
            h-2.5
            w-2.5
            rounded-full
            bg-blue-400
          "
                />
            </div>

        </div>
    );
}