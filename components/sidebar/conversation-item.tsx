"use client";

import { MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

type ConversationItemProps = {
    title: string;
    date: string;
    active?: boolean;
    onClick?: () => void;
};

export default function ConversationItem({
                                             title,
                                             date,
                                             active = false,
                                             onClick,
                                         }: ConversationItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                `
          group
          relative
          flex
          w-full
          items-center
          gap-3
          overflow-hidden
          rounded-2xl
          border
          border-transparent
          px-3
          py-3
          text-left
          transition-all
          duration-300
          hover:border-white/5
          hover:bg-white/[0.04]
        `,
                active &&
                `
            border-blue-500/20
            bg-blue-500/[0.08]
            shadow-[0_0_30px_rgba(59,130,246,.12)]
          `
            )}
        >
            {/* Left Accent */}

            <span
                className={cn(
                    `
            absolute
            left-0
            top-2
            h-[calc(100%-16px)]
            w-[3px]
            rounded-full
            bg-blue-500
            opacity-0
            transition-all
            duration-300
          `,
                    active && "opacity-100"
                )}
            />

            {/* Icon */}

            <div
                className={cn(
                    `
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            transition-all
            duration-300
            group-hover:border-blue-500/20
            group-hover:bg-blue-500/10
          `,
                    active &&
                    `
              border-blue-500/20
              bg-blue-500/10
            `
                )}
            >
                <MessageSquare
                    size={17}
                    className={cn(
                        "text-secondary transition-colors",
                        active && "text-blue-400"
                    )}
                />
            </div>

            {/* Text */}

            <div className="min-w-0 flex-1">

                <p
                    className={cn(
                        `
              truncate
              text-sm
              font-medium
              text-primary
            `,
                        active && "text-white"
                    )}
                >
                    {title}
                </p>

                <p className="mt-1 text-xs text-secondary">
                    {date}
                </p>

            </div>
        </button>
    );
}