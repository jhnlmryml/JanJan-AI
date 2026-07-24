"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

import CodeBlock from "./code-block";

type MarkdownProps = {
    children: string;
};

export default function Markdown({
                                     children,
                                 }: MarkdownProps) {
    return (
        <div
            className="
        prose
        prose-invert
        prose-zinc
        max-w-none

        prose-headings:mb-4
        prose-headings:font-semibold
        prose-headings:text-white

        prose-p:leading-8
        prose-p:text-zinc-300

        prose-strong:text-white

        prose-a:text-blue-400
        prose-a:no-underline
        hover:prose-a:underline

        prose-blockquote:border-blue-500
        prose-blockquote:text-zinc-300

        prose-li:text-zinc-300

        prose-table:w-full
        prose-th:border-white/10
        prose-td:border-white/10

        prose-code:rounded
        prose-code:bg-transparent
        prose-code:px-0
        prose-code:py-0
        prose-code:text-sky-300

        prose-pre:bg-transparent
        prose-pre:p-0
      "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    pre(props) {
                        const child = props.children as any;

                        if (
                            child?.props?.children &&
                            child?.props?.className
                        ) {
                            return (
                                <CodeBlock
                                    language={child.props.className.replace(
                                        "language-",
                                        ""
                                    )}
                                    code={String(child.props.children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                />
                            );
                        }

                        return <pre {...props} />;
                    },
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}