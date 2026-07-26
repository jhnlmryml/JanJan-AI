"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ChatTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const MAX_HEIGHT = 180;

const ChatTextarea = React.forwardRef<HTMLTextAreaElement, ChatTextareaProps>(
    ({ className, value, onChange, ...props }, forwardedRef) => {
        const internalRef = React.useRef<HTMLTextAreaElement>(null);

        // Merge internal and external refs
        const setRefs = React.useCallback(
            (node: HTMLTextAreaElement | null) => {
                internalRef.current = node;
                if (typeof forwardedRef === "function") {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
                }
            },
            [forwardedRef]
        );

        // Auto-resize height without showing vertical scrollbar
        React.useLayoutEffect(() => {
            const textarea = internalRef.current;
            if (!textarea) return;

            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;
        }, [value]);

        return (
            <textarea
                {...props}
                ref={setRefs}
                value={value}
                onChange={onChange}
                rows={1}
                className={cn(
                    `
                        w-full border-none bg-transparent text-[15px] leading-relaxed 
                        text-slate-100 placeholder:text-slate-400 outline-none ring-0 
                        focus:outline-none focus:ring-0 shadow-none
                        scrollbar-none overflow-y-auto
                        disabled:cursor-not-allowed disabled:opacity-50
                    `,
                    className
                )}
            />
        );
    }
);

ChatTextarea.displayName = "ChatTextarea";

export { ChatTextarea };