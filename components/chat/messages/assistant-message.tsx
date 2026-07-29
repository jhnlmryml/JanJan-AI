"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import { APP } from "@/config/site";

type AssistantMessageProps = {
    content: string;
};

type ExtraProps = {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

export default function AssistantMessage({ content }: AssistantMessageProps) {
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    const handleFeedback = (type: "like" | "dislike") => {
        setFeedback((prev) => (prev === type ? null : type));
    };

    return (
        <div className="fade-up group relative flex w-full gap-3 py-3 sm:gap-4">
            <div className="relative min-w-0 flex-1 space-y-2.5">

                {/* Agent Header */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <div className="relative flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-lg bg-blue-500/10 sm:h-8 sm:w-8">
                        {APP.logo ? (
                            <Image
                                src={APP.logo}
                                alt={`${APP.name} avatar`}
                                width={20}
                                height={20}
                                preload
                                className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                            />
                        ) : (
                            <Sparkles className="h-4 w-4 text-blue-400" />
                        )}
                    </div>

                    <span className="flex items-center gap-1.5 font-sans tracking-tight">
                        {APP.name}
                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                            AI
                        </span>
                    </span>
                </div>

                {/* Formatted Markdown Content */}
                <div className="markdown-content font-sans text-xs sm:text-sm leading-relaxed text-slate-200">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p({ children }) {
                                return (
                                    <p className="mb-3 leading-relaxed last:mb-0 whitespace-pre-line">
                                        {children}
                                    </p>
                                );
                            },
                            h1({ children }) {
                                return (
                                    <h1 className="mt-5 mb-2.5 text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                                        {children}
                                    </h1>
                                );
                            },
                            h2({ children }) {
                                return (
                                    <h2 className="mt-4 mb-2 text-base sm:text-lg font-bold tracking-tight text-slate-100">
                                        {children}
                                    </h2>
                                );
                            },
                            h3({ children }) {
                                return (
                                    <h3 className="mt-3.5 mb-1.5 text-sm sm:text-base font-semibold text-slate-100">
                                        {children}
                                    </h3>
                                );
                            },
                            h4({ children }) {
                                return (
                                    <h4 className="mt-3 mb-1 text-xs sm:text-sm font-semibold text-slate-200">
                                        {children}
                                    </h4>
                                );
                            },
                            ul({ children }) {
                                return (
                                    <ul className="my-2.5 ml-4 list-disc space-y-1 pl-2 text-slate-200">
                                        {children}
                                    </ul>
                                );
                            },
                            ol({ children }) {
                                return (
                                    <ol className="my-2.5 ml-4 list-decimal space-y-1 pl-2 text-slate-200">
                                        {children}
                                    </ol>
                                );
                            },
                            li({ children }) {
                                return (
                                    <li className="pl-1 leading-relaxed">
                                        {children}
                                    </li>
                                );
                            },
                            blockquote({ children }) {
                                return (
                                    <blockquote className="my-3 border-l-3 border-blue-500/60 bg-blue-500/5 py-2 pl-4 pr-3 italic text-slate-300 rounded-r-lg">
                                        {children}
                                    </blockquote>
                                );
                            },
                            hr() {
                                return <hr className="my-4 border-white/10" />;
                            },
                            strong({ children }) {
                                return (
                                    <strong className="font-semibold text-slate-100">
                                        {children}
                                    </strong>
                                );
                            },
                            em({ children }) {
                                return (
                                    <em className="italic text-slate-200">
                                        {children}
                                    </em>
                                );
                            },
                            table({ children }) {
                                return (
                                    <div className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d12]">
                                        <table className="w-full text-left text-xs border-collapse">
                                            {children}
                                        </table>
                                    </div>
                                );
                            },
                            thead({ children }) {
                                return (
                                    <thead className="bg-white/5 border-b border-white/10 text-slate-200">
                                    {children}
                                    </thead>
                                );
                            },
                            tbody({ children }) {
                                return (
                                    <tbody className="divide-y divide-white/5">
                                    {children}
                                    </tbody>
                                );
                            },
                            tr({ children }) {
                                return <tr>{children}</tr>;
                            },
                            th({ children }) {
                                return (
                                    <th className="px-3.5 py-2.5 font-semibold text-slate-200">
                                        {children}
                                    </th>
                                );
                            },
                            td({ children }) {
                                return (
                                    <td className="px-3.5 py-2.5 text-slate-300">
                                        {children}
                                    </td>
                                );
                            },
                            code({ inline, className, children, ...props }: ExtraProps & React.HTMLAttributes<HTMLElement>) {
                                const match = /language-(\w+)/.exec(className || "");
                                const codeString = String(children).replace(/\n$/, "");

                                if (!inline && match) {
                                    const language = match[1];
                                    const isCodeCopied = copiedText === codeString;

                                    return (
                                        <div className="relative my-4 flex flex-col rounded-xl border border-white/10 bg-[#0d0d12] shadow-xl">
                                            {/* Header */}
                                            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between rounded-t-xl border-b border-white/10 bg-[#121218] px-3.5 py-2 text-xs font-mono text-slate-400">
                                                <span className="text-[11px] font-semibold tracking-wide uppercase text-blue-400">
                                                    {language}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => void handleCopy(codeString)}
                                                    className="flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                                                >
                                                    {isCodeCopied ? (
                                                        <>
                                                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                            <span className="font-medium text-emerald-400">Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-3.5 w-3.5 text-slate-400" />
                                                            <span>Copy code</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Code Block */}
                                            <div className="max-h-[450px] overflow-auto text-xs font-mono leading-relaxed no-scrollbar">
                                                <SyntaxHighlighter
                                                    language={language}
                                                    style={vscDarkPlus}
                                                    customStyle={{
                                                        margin: 0,
                                                        padding: "0.875rem 1rem",
                                                        background: "transparent",
                                                        fontSize: "0.8125rem",
                                                        lineHeight: "1.6",
                                                    }}
                                                    codeTagProps={{
                                                        style: {
                                                            fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                                                        },
                                                    }}
                                                >
                                                    {codeString}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <code
                                        className="rounded-md border border-white/10 bg-white/[0.08] px-1.5 py-0.5 text-[12px] font-mono font-medium text-blue-300"
                                        style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },

                            a({ children, href }) {
                                return (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-blue-400 underline decoration-blue-400/40 underline-offset-4 transition-colors hover:text-blue-300"
                                    >
                                        {children}
                                    </a>
                                );
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex items-center gap-1 pt-1 text-slate-400">
                    <button
                        type="button"
                        onClick={() => void handleCopy(content)}
                        className="flex items-center gap-1.5 rounded-lg p-1.5 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200 active:scale-95"
                        title="Copy message"
                    >
                        {copiedText === content ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                            <Copy className="h-3.5 w-3.5" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFeedback("like")}
                        className={`rounded-lg p-1.5 transition-all active:scale-95 ${
                            feedback === "like"
                                ? "bg-blue-500/10 text-blue-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        }`}
                        title="Good response"
                    >
                        <ThumbsUp className="h-3.5 w-3.5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFeedback("dislike")}
                        className={`rounded-lg p-1.5 transition-all active:scale-95 ${
                            feedback === "dislike"
                                ? "bg-rose-500/10 text-rose-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        }`}
                        title="Bad response"
                    >
                        <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                </div>

            </div>
        </div>
    );
}