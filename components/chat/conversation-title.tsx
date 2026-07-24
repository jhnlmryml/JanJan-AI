"use client";

import { Sparkles } from "lucide-react";

type ConversationTitleProps = {
    title: string;
    subtitle?: string;
};

export default function ConversationTitle({
                                              title,
                                              subtitle,
                                          }: ConversationTitleProps) {
    return (
        <header
            className="
        sticky
        top-0
        z-20

        border-b
        border-white/5

        bg-background/70
        backdrop-blur-2xl

        supports-[backdrop-filter]:bg-background/60
      "
        >
            <div className="container-chat flex h-16 items-center justify-between px-6">

                <div className="min-w-0">

                    <h1
                        className="
              truncate
              text-lg
              font-semibold
              tracking-tight
              text-white
            "
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="
                mt-0.5
                truncate
                text-sm
                text-secondary
              "
                        >
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className="
            flex
            items-center
            gap-2

            rounded-full
            border
            border-blue-500/15

            bg-blue-500/10

            px-3
            py-1.5
          "
                >
                    <Sparkles
                        size={14}
                        className="text-blue-400"
                    />

                    <span
                        className="
              text-xs
              font-medium
              text-blue-300
            "
                    >
            AI Ready
          </span>

                </div>

            </div>
        </header>
    );
}