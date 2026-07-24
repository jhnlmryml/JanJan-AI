"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ChatTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatTextarea = React.forwardRef<
    HTMLTextAreaElement,
    ChatTextareaProps
>(({ className, onInput, ...props }, ref) => {
    function handleAutoResize(
        e: React.FormEvent<HTMLTextAreaElement>
    ) {
        const textarea = e.currentTarget;

        textarea.style.height = "0px";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            220
        )}px`;

        onInput?.(e);
    }

    return (
        <textarea
            ref={ref}
            rows={1}
            onInput={handleAutoResize}
            className={cn(
                `
          w-full
          resize-none
          overflow-y-auto
          bg-transparent

          px-0
          py-0

          text-[15px]
          leading-7
          text-primary

          placeholder:text-secondary

          outline-none
          border-none
          shadow-none

          focus:outline-none
          focus:ring-0

          disabled:cursor-not-allowed
          disabled:opacity-60

          scrollbar-thin
        `,
                className
            )}
            {...props}
        />
    );
});

ChatTextarea.displayName = "ChatTextarea";

export { ChatTextarea };