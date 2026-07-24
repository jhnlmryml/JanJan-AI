"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

type TooltipProps = {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
};

export function Tooltip({
                            children,
                            content,
                            side = "top",
                            align = "center",
                            delayDuration = 150,
                        }: TooltipProps) {
    return (
        <TooltipPrimitive.Provider
            delayDuration={delayDuration}
        >
            <TooltipPrimitive.Root>

                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={side}
                        align={align}
                        sideOffset={10}
                        className={cn(
                            `
                z-50

                rounded-xl
                border
                border-white/10

                bg-[#16181D]/95

                px-3
                py-2

                text-xs
                font-medium
                text-zinc-100

                shadow-[0_10px_60px_rgba(0,0,0,.45)]
                backdrop-blur-xl

                animate-in
                fade-in
                zoom-in-95

                data-[state=closed]:animate-out
                data-[state=closed]:fade-out
                data-[state=closed]:zoom-out-95
              `
                        )}
                    >
                        {content}

                        <TooltipPrimitive.Arrow
                            className="fill-[#16181D]"
                            width={12}
                            height={6}
                        />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>

            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}