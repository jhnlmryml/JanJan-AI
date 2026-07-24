"use client";

import { useState } from "react";
import {
    Check,
    Clipboard,
    Pencil,
    RotateCcw,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";

type MessageActionsProps = {
    content: string;
    isAssistant?: boolean;
    onEdit?: () => void;
    onRegenerate?: () => void;
};

export default function MessageActions({
                                           content,
                                           isAssistant = true,
                                           onEdit,
                                           onRegenerate,
                                       }: MessageActionsProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(content);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            //
        }
    }

    return (
        <div
            className="
        mt-3
        flex
        items-center
        gap-1
        opacity-0
        transition-all
        duration-300
        group-hover:opacity-100
      "
        >
            <button
                onClick={handleCopy}
                className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-white/5
          bg-white/[0.03]
          text-secondary
          transition-all
          hover:border-blue-500/20
          hover:bg-blue-500/10
          hover:text-white
        "
                title="Copy"
            >
                {copied ? (
                    <Check size={15} />
                ) : (
                    <Clipboard size={15} />
                )}
            </button>

            {!isAssistant && (
                <button
                    onClick={onEdit}
                    className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            text-secondary
            transition-all
            hover:border-blue-500/20
            hover:bg-blue-500/10
            hover:text-white
          "
                    title="Edit"
                >
                    <Pencil size={15} />
                </button>
            )}

            {isAssistant && (
                <>
                    <button
                        onClick={onRegenerate}
                        className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/5
              bg-white/[0.03]
              text-secondary
              transition-all
              hover:border-blue-500/20
              hover:bg-blue-500/10
              hover:text-white
            "
                        title="Regenerate"
                    >
                        <RotateCcw size={15} />
                    </button>

                    <button
                        className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/5
              bg-white/[0.03]
              text-secondary
              transition-all
              hover:border-green-500/20
              hover:bg-green-500/10
              hover:text-green-300
            "
                        title="Good response"
                    >
                        <ThumbsUp size={15} />
                    </button>

                    <button
                        className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/5
              bg-white/[0.03]
              text-secondary
              transition-all
              hover:border-red-500/20
              hover:bg-red-500/10
              hover:text-red-300
            "
                        title="Bad response"
                    >
                        <ThumbsDown size={15} />
                    </button>
                </>
            )}
        </div>
    );
}