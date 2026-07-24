"use client";

import { cn } from "@/lib/utils";

type SpinnerProps = {
    size?: "sm" | "md" | "lg";
    className?: string;
};

const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[2.5px]",
    lg: "h-8 w-8 border-[3px]",
};

export default function Spinner({
                                    size = "md",
                                    className,
                                }: SpinnerProps) {
    return (
        <span
            aria-label="Loading"
            role="status"
            className={cn(
                `
          inline-block
          animate-spin
          rounded-full

          border-white/15
          border-t-blue-500

          shadow-[0_0_20px_rgba(59,130,246,.25)]
        `,
                sizes[size],
                className
            )}
        />
    );
}