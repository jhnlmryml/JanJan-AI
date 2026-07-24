"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DividerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
}

const Divider = React.forwardRef<
    HTMLDivElement,
    DividerProps
>(
    (
        {
            className,
            orientation = "horizontal",
            decorative = true,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                role={decorative ? "presentation" : "separator"}
                aria-orientation={orientation}
                className={cn(
                    orientation === "horizontal"
                        ? `
                h-px
                w-full
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
              `
                        : `
                h-full
                w-px
                bg-gradient-to-b
                from-transparent
                via-white/10
                to-transparent
              `,
                    "shrink-0",
                    className
                )}
                {...props}
            />
        );
    }
);

Divider.displayName = "Divider";

export { Divider };