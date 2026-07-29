"use client";

import type {
    KeyboardEvent,
} from "react";

import {
    useState,
    useEffect,
    useRef,
} from "react";

import type { ChatStatus } from "ai";

import {
    ArrowUp,
    Square,
} from "lucide-react";

import { Button } from "@/components/core/button";
import {
    PLACEHOLDERS,
    SUGGESTIONS,
} from "@/lib/ai/constants";

type ChatInputProps = {
    status: ChatStatus;
    sendMessageAction: (
        message: { text: string }
    ) => void;
    stopAction?: () => void;
    hasMessages?: boolean;
};

export default function ChatInput({
                                      status,
                                      sendMessageAction,
                                      stopAction,
                                      hasMessages = false,
                                  }: ChatInputProps) {
    const [input, setInput] = useState("");
    const [placeholderIndex, setPlaceholderIndex] =
        useState(0);

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    const isReady = status === "ready";

    const isStreaming =
        status === "streaming" ||
        status === "submitted";

    const disabled =
        !isReady ||
        input.trim().length === 0;

    // Auto-grow textarea.
    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            180
        )}px`;
    }, [input]);

    const currentPlaceholder = hasMessages
        ? "Ask Janjan anything..."
        : PLACEHOLDERS[placeholderIndex];

    // Rotate placeholder text only when the
    // conversation has not started.
    useEffect(() => {
        if (
            hasMessages ||
            input.length > 0
        ) {
            return;
        }

        const interval = setInterval(() => {
            setPlaceholderIndex(
                (previous) =>
                    (previous + 1) %
                    PLACEHOLDERS.length
            );
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [hasMessages, input]);

    function submit(
        textToSubmit?: string
    ) {
        const text = (
            textToSubmit ?? input
        ).trim();

        if (!text || !isReady) {
            return;
        }

        sendMessageAction({ text });

        setInput("");

        if (textareaRef.current) {
            textareaRef.current.style.height =
                "auto";
        }
    }

    // function handleStop(
    //     event?: MouseEvent | KeyboardEvent
    // ) {
    //     if (event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //
    //     stopAction?.();
    // }

    function handleStop() {
        stopAction?.();
    }

    function handleKeyDown(
        event: KeyboardEvent<HTMLTextAreaElement>
    ) {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            if (isStreaming) {
                handleStop();
            } else {
                submit();
            }
        }
    }

    function handleSuggestionClick(
        prompt: string
    ) {
        if (!isReady) return;

        submit(prompt);
    }

    const isTyping =
        input.trim().length > 0;

    const shouldDisplaySuggestions =
        !hasMessages && !isTyping;

    const marqueeItems = [
        ...SUGGESTIONS,
        ...SUGGESTIONS,
    ];

    return (
        <footer
            className="
                safe-bottom
                relative
                z-40
                w-full
                shrink-0
                px-3
                pb-3
                sm:px-6
                sm:pb-5
            "
        >
            <div
                className="
                    container-chat
                    relative
                    mx-auto
                    max-w-3xl
                "
            >
                {/* Suggestions */}
                {shouldDisplaySuggestions && (
                    <div
                        className="
                            fade-up
                            pointer-events-none
                            absolute
                            bottom-full
                            left-0
                            right-0
                            mb-3
                            flex
                            justify-center
                            px-1
                        "
                    >
                        <div
                            className="
                                pointer-events-auto
                                relative
                                flex
                                w-full
                                max-w-xl
                                overflow-hidden
                                rounded-full
                                py-1.5
                                shadow-lg
                                backdrop-blur-2xl
                                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                            "
                        >
                            <div
                                className="
                                    animate-marquee
                                    flex
                                    gap-2
                                    whitespace-nowrap
                                    hover:[animation-play-state:paused]
                                "
                            >
                                {marqueeItems.map(
                                    (
                                        item,
                                        index
                                    ) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        item.prompt
                                                    )
                                                }
                                                className="
                                                    group
                                                    flex
                                                    shrink-0
                                                    items-center
                                                    gap-1.5
                                                    rounded-full
                                                    border
                                                    border-white/5
                                                    bg-white/[0.04]
                                                    px-3.5
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-slate-300
                                                    transition-all
                                                    duration-200
                                                    hover:border-blue-500/40
                                                    hover:bg-blue-500/10
                                                    hover:text-white
                                                    hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]
                                                    active:scale-95
                                                "
                                            >
                                                <Icon
                                                    className="
                                                        h-3.5
                                                        w-3.5
                                                        text-slate-400
                                                        transition-colors
                                                        group-hover:text-blue-400
                                                    "
                                                />

                                                <span>
                                                    {
                                                        item.label
                                                    }
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Input Shell */}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (isStreaming) {
                            handleStop();
                        } else {
                            submit();
                        }
                    }}
                    className="
                        group
                        relative
                        flex
                        items-end
                        gap-2
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#0d0d12]/90
                        p-2
                        pl-4
                        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                        backdrop-blur-2xl
                        transition-all
                        duration-300
                        focus-within:border-blue-500/50
                        focus-within:ring-2
                        focus-within:ring-blue-500/20
                        sm:rounded-3xl
                        sm:p-2.5
                        sm:pl-5
                    "
                >
                    {/* Textarea */}
                    <div
                        className="
                            relative
                            min-w-0
                            flex-1
                            py-1
                        "
                    >
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            disabled={
                                !isReady &&
                                !isStreaming
                            }
                            placeholder={
                                currentPlaceholder
                            }
                            onChange={(event) =>
                                setInput(
                                    event.target.value
                                )
                            }
                            onKeyDown={
                                handleKeyDown
                            }
                            className="
                                w-full
                                resize-none
                                bg-transparent
                                text-xs
                                leading-relaxed
                                text-slate-100
                                placeholder:text-slate-400/80
                                placeholder:transition-opacity
                                placeholder:duration-300
                                focus:outline-none
                                focus:placeholder:opacity-40
                                disabled:opacity-50
                                max-h-[180px]
                                overflow-y-auto
                                no-scrollbar
                                sm:text-sm
                            "
                        />
                    </div>

                    {/* Send / Stop */}
                    {isStreaming ? (
                        <Button
                            type="button"
                            size="icon"
                            onClick={
                                handleStop
                            }
                            aria-label="Stop generating"
                            className="
                                h-8
                                w-8
                                shrink-0
                                rounded-xl
                                bg-slate-100
                                text-slate-900
                                shadow-md
                                shadow-white/10
                                transition-all
                                duration-200
                                hover:scale-105
                                hover:bg-white
                                active:scale-95
                                sm:h-9
                                sm:w-9
                                sm:rounded-2xl
                            "
                        >
                            <Square
                                className="
                                    h-3.5
                                    w-3.5
                                    fill-slate-900
                                "
                            />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            size="icon"
                            disabled={disabled}
                            aria-label="Send message"
                            className="
                                h-8
                                w-8
                                shrink-0
                                rounded-xl
                                bg-blue-600
                                text-white
                                shadow-md
                                shadow-blue-600/30
                                transition-all
                                duration-200
                                hover:scale-105
                                hover:bg-blue-500
                                hover:shadow-blue-500/50
                                active:scale-95
                                disabled:bg-slate-800/80
                                disabled:text-slate-500
                                disabled:opacity-40
                                disabled:shadow-none
                                disabled:hover:scale-100
                                sm:h-9
                                sm:w-9
                                sm:rounded-2xl
                            "
                        >
                            <ArrowUp
                                className="h-4 w-4"
                                strokeWidth={2.5}
                            />
                        </Button>
                    )}
                </form>
            </div>
        </footer>
    );
}



// "use client";
//
// import type { KeyboardEvent, MouseEvent } from "react";
// import { useState, useEffect, useRef } from "react";
// import type { ChatStatus } from "ai";
// import { ArrowUp, Square } from "lucide-react";
//
// import { Button } from "@/components/core/button";
// import { PLACEHOLDERS, SUGGESTIONS } from "@/lib/ai/constants";
//
// type ChatInputProps = {
//     status: ChatStatus;
//     sendMessageAction: (message: { text: string }) => void;
//     stopAction?: () => void;
//     hasMessages?: boolean;
// };
//
// export default function ChatInput({
//                                       status,
//                                       sendMessageAction,
//                                       stopAction,
//                                       hasMessages = false,
//                                   }: ChatInputProps) {
//     const [input, setInput] = useState("");
//     const [placeholderIndex, setPlaceholderIndex] = useState(0);
//     const textareaRef = useRef<HTMLTextAreaElement>(null);
//
//     const isReady = status === "ready";
//     const isStreaming = status === "streaming" || status === "submitted";
//     const disabled = !isReady || input.trim().length === 0;
//
//     // Auto-grow textarea height smoothly inside container
//     useEffect(() => {
//         if (!textareaRef.current) return;
//         textareaRef.current.style.height = "auto";
//         textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
//     }, [input]);
//
//     // Active placeholder
//     const currentPlaceholder = hasMessages
//         ? "Ask Janjan anything..."
//         : PLACEHOLDERS[placeholderIndex];
//
//     // Cycle rotating native placeholder text ONLY when empty and no active conversation
//     useEffect(() => {
//         if (hasMessages || input.length > 0) return;
//
//         const interval = setInterval(() => {
//             setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
//         }, 4000);
//
//         return () => clearInterval(interval);
//     }, [hasMessages, input]);
//
//     function submit(textToSubmit?: string) {
//         const text = (textToSubmit ?? input).trim();
//         if (!text || !isReady) return;
//
//         sendMessageAction({ text });
//         setInput("");
//
//         if (textareaRef.current) {
//             textareaRef.current.style.height = "auto";
//         }
//     }
//
//     // Handles stopping streaming cleanly without form interference
//     function handleStop(e?: MouseEvent | KeyboardEvent) {
//         if (e) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//         if (stopAction) {
//             stopAction();
//         }
//     }
//
//     function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
//         if (event.key === "Enter" && !event.shiftKey) {
//             event.preventDefault();
//             if (isStreaming) {
//                 handleStop(event);
//             } else {
//                 submit();
//             }
//         }
//     }
//
//     function handleSuggestionClick(prompt: string) {
//         if (!isReady) return;
//         submit(prompt);
//     }
//
//     const isTyping = input.trim().length > 0;
//
//     // Hide suggestions when a conversation has started OR user is actively typing
//     const shouldDisplaySuggestions = !hasMessages && !isTyping;
//
//     // Duplicated array for seamless infinite marquee loop
//     const marqueeItems = [...SUGGESTIONS, ...SUGGESTIONS];
//
//     return (
//         <footer className="safe-bottom relative w-full px-3 pb-3 sm:px-6 sm:pb-5">
//             <div className="container-chat relative mx-auto max-w-3xl">
//
//                 {/* Embedded Floating Marquee Suggestions (Positioned Absolutely Above) */}
//                 {shouldDisplaySuggestions && (
//                     <div className="fade-up pointer-events-none absolute bottom-full left-0 right-0 mb-3 flex justify-center px-1">
//                         <div
//                             className="
//                                 pointer-events-auto relative flex w-full max-w-xl overflow-hidden
//                                 rounded-full py-1.5
//                                 shadow-lg backdrop-blur-2xl
//                                 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
//                             "
//                         >
//                             {/* Animated Marquee Track */}
//                             <div className="animate-marquee flex gap-2 whitespace-nowrap hover:[animation-play-state:paused]">
//                                 {marqueeItems.map((item, index) => {
//                                     const Icon = item.icon;
//                                     return (
//                                         <button
//                                             key={index}
//                                             type="button"
//                                             onClick={() => handleSuggestionClick(item.prompt)}
//                                             className="
//                                                 group flex shrink-0 items-center gap-1.5
//                                                 rounded-full border border-white/5 bg-white/[0.04]
//                                                 px-3.5 py-1 text-xs font-medium text-slate-300
//                                                 transition-all duration-200
//                                                 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white
//                                                 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]
//                                                 active:scale-95
//                                             "
//                                         >
//                                             <Icon className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-blue-400" />
//                                             <span>{item.label}</span>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Progressive Container Input Shell */}
//                 <form
//                     onSubmit={(e) => {
//                         e.preventDefault();
//                         if (isStreaming) {
//                             handleStop(e);
//                         } else {
//                             submit();
//                         }
//                     }}
//                     className="
//                         group relative flex items-end gap-2
//                         rounded-2xl sm:rounded-3xl
//                         border border-white/10 bg-[#0d0d12]/90 p-2 sm:p-2.5 pl-4 sm:pl-5
//                         shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl
//                         transition-all duration-300
//                         focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20
//                     "
//                 >
//                     {/* Native Auto-Resizing Textarea */}
//                     <div className="relative flex-1 py-1">
//                         <textarea
//                             ref={textareaRef}
//                             rows={1}
//                             value={input}
//                             disabled={!isReady && !isStreaming}
//                             placeholder={currentPlaceholder}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={handleKeyDown}
//                             className="
//                                 w-full resize-none bg-transparent text-xs sm:text-sm
//                                 leading-relaxed text-slate-100 placeholder:text-slate-400/80
//                                 placeholder:transition-opacity placeholder:duration-300
//                                 focus:outline-none focus:placeholder:opacity-40
//                                 disabled:opacity-50 max-h-[180px] overflow-y-auto no-scrollbar
//                             "
//                         />
//                     </div>
//
//                     {/* Dynamic Action Button: Send vs Stop */}
//                     {isStreaming ? (
//                         <Button
//                             type="button"
//                             size="icon"
//                             onClick={handleStop}
//                             aria-label="Stop generating"
//                             className="
//                                 h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl sm:rounded-2xl
//                                 bg-slate-100 text-slate-900 shadow-md shadow-white/10
//                                 transition-all duration-200
//                                 hover:bg-white hover:scale-105 active:scale-95
//                             "
//                         >
//                             <Square className="h-3.5 w-3.5 fill-slate-900" />
//                         </Button>
//                     ) : (
//                         <Button
//                             type="submit"
//                             size="icon"
//                             disabled={disabled}
//                             aria-label="Send message"
//                             className="
//                                 h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl sm:rounded-2xl
//                                 bg-blue-600 text-white shadow-md shadow-blue-600/30
//                                 transition-all duration-200
//                                 hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-105
//                                 active:scale-95 disabled:bg-slate-800/80 disabled:text-slate-500
//                                 disabled:shadow-none disabled:hover:scale-100 disabled:opacity-40
//                             "
//                         >
//                             <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
//                         </Button>
//                     )}
//                 </form>
//
//             </div>
//         </footer>
//     );
// }