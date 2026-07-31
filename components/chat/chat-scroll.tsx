"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

type ChatScrollProps = {
    children: React.ReactNode;
};

export default function ChatScroll({ children }: ChatScrollProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [showScrollButton, setShowScrollButton] = useState(false);

    const isUserScrolledUp = useRef(false);
    const isProgrammaticScroll = useRef(false);

    const scrollToBottom = useCallback((instant = true) => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        isProgrammaticScroll.current = true;

        if (instant) {
            viewport.scrollTop = viewport.scrollHeight;
        } else {
            viewport.scrollTo({
                top: viewport.scrollHeight,
                behavior: "smooth",
            });
        }

        window.setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 100);
    }, []);

    const handleScroll = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport || isProgrammaticScroll.current) return;

        requestAnimationFrame(() => {
            const { scrollTop, scrollHeight, clientHeight } = viewport;
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
            const isUp = distanceFromBottom > 120;

            if (isUserScrolledUp.current !== isUp) {
                isUserScrolledUp.current = isUp;
                setShowScrollButton(isUp);
            }
        });
    }, []);

    const handleButtonClick = useCallback(() => {
        isUserScrolledUp.current = false;
        setShowScrollButton(false);
        scrollToBottom(false);
    }, [scrollToBottom]);

    // Follow new messages while user is near the bottom
    useEffect(() => {
        if (isUserScrolledUp.current) return;

        const rafId = requestAnimationFrame(() => {
            scrollToBottom(true);
        });

        return () => cancelAnimationFrame(rafId);
    }, [children, scrollToBottom]);

    // Follow content height changes while streaming
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const observer = new ResizeObserver(() => {
            if (!isUserScrolledUp.current) {
                requestAnimationFrame(() => scrollToBottom(true));
            }
        });

        observer.observe(content);
        return () => observer.disconnect();
    }, [scrollToBottom]);

    return (
        <div className="relative flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
            {/* TOP SHADOW / FADE */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-8 bg-gradient-to-b from-[#0d0d12] via-[#0d0d12]/60 to-transparent" />

            {/* ACTUAL SCROLL VIEWPORT */}
            <div
                ref={viewportRef}
                onScroll={handleScroll}
                className="min-h-0 min-w-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain no-scrollbar touch-pan-y"
                style={{
                    WebkitOverflowScrolling: "touch",
                    scrollBehavior: "auto",
                }}
            >
                <div
                    ref={contentRef}
                    className="flex min-h-full flex-col justify-end px-4 py-8 pb-10 sm:px-8 sm:pb-10"
                >
                    {children}
                </div>
            </div>

            {/* BOTTOM SHADOW / FADE */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-12 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/60 to-transparent" />

            {/* SCROLL TO BOTTOM BUTTON */}
            <div
                className={`absolute bottom-5 left-1/2 z-30 -translate-x-1/2 transition-all duration-300 ease-out ${
                    showScrollButton
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "translate-y-4 opacity-0 pointer-events-none"
                }`}
            >
                <button
                    type="button"
                    onClick={handleButtonClick}
                    aria-label="Scroll to bottom"
                    className="group flex items-center gap-2 rounded-full border border-white/15 bg-[#121218]/90 p-4 text-xs font-semibold text-slate-200 shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-600/30 hover:text-white active:scale-95"
                >
                    <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </button>
            </div>
        </div>
    );
}