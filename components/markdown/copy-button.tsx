"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/core/button";

type CopyButtonProps = {
    value: string;
};

export default function CopyButton({
                                       value,
                                   }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    useEffect(() => {
        if (!copied) return;

        const timer = setTimeout(() => {
            setCopied(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="
        h-9
        rounded-xl
        border
        border-white/5
        bg-white/[0.03]
        text-secondary
        hover:border-blue-500/20
        hover:bg-blue-500/10
        hover:text-white
      "
        >
            {copied ? (
                <>
                    <Check size={15} />
                    Copied
                </>
            ) : (
                <>
                    <Copy size={15} />
                    Copy
                </>
            )}
        </Button>
    );
}