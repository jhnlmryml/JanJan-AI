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

    // Fast, flicker-free auto-scroll to bottom during streaming
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

        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 100);
    }, []);

    // Detect user manual scrolling
    const handleScroll = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport || isProgrammaticScroll.current) return;

        const { scrollTop, scrollHeight, clientHeight } = viewport;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        const isUp = distanceFromBottom > 120;
        isUserScrolledUp.current = isUp;
        setShowScrollButton(isUp);
    }, []);

    // Scroll to bottom click handler
    const handleButtonClick = () => {
        isUserScrolledUp.current = false;
        setShowScrollButton(false);
        scrollToBottom(false);
    };

    // Auto scroll when content streams in
    useEffect(() => {
        if (!isUserScrolledUp.current) {
            requestAnimationFrame(() => {
                scrollToBottom(true);
            });
        }
    }, [children, scrollToBottom]);

    // Handle dynamic resize changes
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const observer = new ResizeObserver(() => {
            if (!isUserScrolledUp.current) {
                scrollToBottom(true);
            }
        });

        observer.observe(content);
        return () => observer.disconnect();
    }, [scrollToBottom]);

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden">

            {/* TOP SHADOW/FADE OVERLAY */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-8 bg-gradient-to-b from-[#0d0d12] via-[#0d0d12]/60 to-transparent" />

            {/* Scroll Viewport */}
            <div
                ref={viewportRef}
                onScroll={handleScroll}
                className="h-full w-full overflow-y-auto no-scrollbar"
                style={{ scrollBehavior: "auto" }}
            >
                <div ref={contentRef} className="flex min-h-full flex-col justify-end px-4 py-8 sm:px-8">
                    {children}
                </div>
            </div>

            {/* BOTTOM SHADOW/FADE OVERLAY */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-10 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/60 to-transparent" />

            {/* Floating "Scroll to Bottom" Button */}
            <div
                className={`absolute bottom-6 left-1/2 z-30 -translate-x-1/2 transition-all duration-300 ease-out ${
                    showScrollButton
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "translate-y-4 opacity-0 pointer-events-none"
                }`}
            >
                <button
                    type="button"
                    onClick={handleButtonClick}
                    aria-label="Scroll to bottom"
                    className="
                        group flex items-center gap-2
                        rounded-full border border-white/15
                        bg-[#121218]/90 px-4 py-2 text-xs font-semibold text-slate-200
                        shadow-2xl backdrop-blur-md transition-all duration-200
                        hover:border-blue-500/50 hover:bg-blue-600/30 hover:text-white
                        active:scale-95
                    "
                >
                    <span>Scroll to bottom</span>
                    <ArrowDown className="h-3.5 w-3.5 text-blue-400 transition-transform duration-200 group-hover:translate-y-0.5" />
                </button>
            </div>

        </div>
    );
}