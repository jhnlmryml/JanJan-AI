"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
    code: string;
    language: string;
};

export default function CodeBlock({
                                      code,
                                      language,
                                  }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {}
    }

    return (
        <div
            className="
        my-6
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0d1117]
        shadow-[0_0_30px_rgba(0,0,0,.35)]
      "
        >
            <div
                className="
          flex
          items-center
          justify-between

          border-b
          border-white/5

          bg-white/[0.03]

          px-4
          py-3
        "
            >
        <span
            className="
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-zinc-400
          "
        >
          {language}
        </span>

                <button
                    onClick={handleCopy}
                    className="
            flex
            items-center
            gap-2

            rounded-lg

            px-3
            py-1.5

            text-xs

            text-zinc-400

            transition-all

            hover:bg-white/5
            hover:text-white
          "
                >
                    {copied ? (
                        <>
                            <Check size={14} />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            Copy
                        </>
                    )}
                </button>
            </div>

            <pre
                className="
          overflow-x-auto
          p-5
          text-sm
          leading-7
        "
            >
        <code>{code}</code>
      </pre>
        </div>
    );
}