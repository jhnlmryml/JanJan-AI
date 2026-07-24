"use client";

import { useEffect, useRef } from "react";

type ChatScrollProps = {
    children: React.ReactNode;
};

export default function ChatScroll({
                                       children,
                                   }: ChatScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [children]);

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full"
        >
            <div className="fade-up">
                {children}
            </div>

            <div ref={bottomRef} />

            {/* Top Fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-12
                    bg-gradient-to-b
                    from-background
                    to-transparent
                "
            />

            {/* Bottom Fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-16
                    bg-gradient-to-t
                    from-background
                    to-transparent
                "
            />
        </div>
    );
}