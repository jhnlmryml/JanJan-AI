"use client";

import type { KeyboardEvent } from "react";
import { useState, useEffect, useRef } from "react";
import type { ChatStatus } from "ai";
import { ArrowUp, Sparkles, Smile, PenTool, Compass } from "lucide-react";

import { Button } from "@/components/core/button";

// Direct, self-contained prompts ready for an immediate AI answer
const SUGGESTIONS = [
    {
        icon: Sparkles,
        label: "Brainstorm Ideas",
        prompt: "Give me 5 creative ideas for a fun weekend activity or hobby.",
    },
    {
        icon: Compass,
        label: "Plan a Day Trip",
        prompt: "Help me create a relaxed 1-day itinerary for a fun day trip out of town.",
    },
    {
        icon: PenTool,
        label: "Write Something",
        prompt: "Write a short, friendly message thanking someone for their help today.",
    },
    {
        icon: Smile,
        label: "Fun Trivia",
        prompt: "Tell me an interesting fun fact that most people don't know about!",
    },
] as const;

// Animated rotating placeholders (Used ONLY on empty state)
const PLACEHOLDERS = [
    "Ask Janjan anything...",
    "What's on your mind today?",
    "Spark a conversation with Janjan...",
    "Brainstorm, write, or ask a question...",
    "Need help with a project or idea?",
] as const;

type ChatInputProps = {
    status: ChatStatus;
    sendMessageAction: (message: { text: string }) => void;
    hasMessages?: boolean;
};

export default function ChatInput({
                                      status,
                                      sendMessageAction,
                                      hasMessages = false
                                  }: ChatInputProps) {
    const [input, setInput] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isReady = status === "ready";
    const disabled = !isReady || input.trim().length === 0;

    // Auto-grow textarea height smoothly inside container
    useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }, [input]);

    // Active placeholder: Fixed static string when messages exist, rotating array when empty
    const currentPlaceholder = hasMessages
        ? "Ask Janjan anything..."
        : PLACEHOLDERS[placeholderIndex];

    // Cycle rotating native placeholder text ONLY when empty and no active conversation
    useEffect(() => {
        if (hasMessages || input.length > 0) return;

        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [hasMessages, input]);

    function submit(textToSubmit?: string) {
        const text = (textToSubmit ?? input).trim();
        if (!text || !isReady) return;

        sendMessageAction({ text });
        setInput("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
        }
    }

    function handleSuggestionClick(prompt: string) {
        if (!isReady) return;
        submit(prompt);
    }

    const isTyping = input.trim().length > 0;

    // Hide suggestions when a conversation has started OR user is actively typing
    const shouldDisplaySuggestions = !hasMessages && !isTyping;

    // Duplicated array for seamless infinite marquee loop
    const marqueeItems = [...SUGGESTIONS, ...SUGGESTIONS];

    return (
        <footer className="safe-bottom relative w-full px-3 pb-3 sm:px-6 sm:pb-5">
            <div className="container-chat relative mx-auto max-w-3xl">

                {/* Embedded Floating Marquee Suggestions */}
                {shouldDisplaySuggestions && (
                    <div className="fade-up mb-2.5 flex justify-center w-full px-1">
                        <div
                            className="
                                relative flex w-full max-w-xl overflow-hidden
                                rounded-full py-1.5
                                shadow-lg backdrop-blur-2xl
                                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                            "
                        >
                            {/* Animated Marquee Track */}
                            <div className="animate-marquee flex gap-2 whitespace-nowrap hover:[animation-play-state:paused]">
                                {marqueeItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSuggestionClick(item.prompt)}
                                            className="
                                                group flex shrink-0 items-center gap-1.5
                                                rounded-full border border-white/5 bg-white/[0.04]
                                                px-3.5 py-1 text-xs font-medium text-slate-300
                                                transition-all duration-200
                                                hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white
                                                hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]
                                                active:scale-95
                                            "
                                        >
                                            <Icon className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-blue-400" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Progressive Container Input Shell */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                    className="
                        group relative flex items-end gap-2
                        rounded-2xl sm:rounded-3xl
                        border border-white/10 bg-[#0d0d12]/90 p-2 sm:p-2.5 pl-4 sm:pl-5
                        shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl
                        transition-all duration-300
                        focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20
                    "
                >
                    {/* Native Auto-Resizing Textarea */}
                    <div className="relative flex-1 py-1">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            disabled={!isReady}
                            placeholder={currentPlaceholder}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="
                                w-full resize-none bg-transparent text-xs sm:text-sm
                                leading-relaxed text-slate-100 placeholder:text-slate-400/80
                                placeholder:transition-opacity placeholder:duration-300
                                focus:outline-none focus:placeholder:opacity-40
                                disabled:opacity-50 max-h-[180px] overflow-y-auto no-scrollbar
                            "
                        />
                    </div>

                    {/* Integrated Action Button */}
                    <Button
                        type="submit"
                        size="icon"
                        disabled={disabled}
                        aria-label="Send message"
                        className="
                            h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl sm:rounded-2xl
                            bg-blue-600 text-white shadow-md shadow-blue-600/30
                            transition-all duration-200
                            hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-105
                            active:scale-95 disabled:bg-slate-800/80 disabled:text-slate-500
                            disabled:shadow-none disabled:hover:scale-100 disabled:opacity-40
                        "
                    >
                        <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                    </Button>
                </form>

            </div>
        </footer>
    );
}