"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    variant?:
        | "default"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
}

const variants = {
    default: `
    border-blue-500/20
    bg-blue-500/10
    text-blue-300
  `,

    secondary: `
    border-white/10
    bg-white/[0.04]
    text-secondary
  `,

    success: `
    border-emerald-500/20
    bg-emerald-500/10
    text-emerald-300
  `,

    warning: `
    border-yellow-500/20
    bg-yellow-500/10
    text-yellow-300
  `,

    danger: `
    border-red-500/20
    bg-red-500/10
    text-red-300
  `,
};

const Badge = React.forwardRef<
    HTMLDivElement,
    BadgeProps
>(
    (
        {
            className,
            variant = "default",
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    `
            inline-flex
            items-center
            gap-1.5

            rounded-full
            border

            px-3
            py-1

            text-xs
            font-medium
            tracking-wide

            backdrop-blur-xl
            transition-all
            duration-300
          `,
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };