"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

import Logo from "@/components/chat/shared/logo";

type AssistantMessageProps = {
    content: string;
};

export default function AssistantMessage({
                                             content,
                                         }: AssistantMessageProps) {
    return (
        <div className="fade-up flex items-start gap-5">

            <Logo />

            <article
                className="
          message-ai
          glass-dark
          max-w-full
          flex-1
          rounded-[28px]
          px-7
          py-6
        "
            >
                <div
                    className="
            prose
            prose-invert
            prose-zinc
            max-w-none

            prose-headings:text-white
            prose-p:text-zinc-300
            prose-strong:text-white
            prose-code:text-sky-300
            prose-pre:border
            prose-pre:border-white/5
            prose-pre:bg-[#0D1117]
            prose-blockquote:border-blue-500
            prose-blockquote:text-zinc-300
            prose-li:text-zinc-300
            prose-a:text-blue-400
          "
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </article>

        </div>
    );
}