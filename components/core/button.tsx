"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonVariant =
    | "default"
    | "secondary"
    | "ghost"
    | "outline"
    | "destructive";

type ButtonSize =
    | "default"
    | "sm"
    | "lg"
    | "icon";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
    default: `
    bg-accent
    text-white
    shadow-[0_0_30px_rgba(59,130,246,.22)]
    hover:bg-accent-hover
    hover:shadow-[0_0_40px_rgba(59,130,246,.32)]
    active:scale-[.98]
  `,

    secondary: `
    glass
    text-primary
    hover:bg-white/[0.06]
    active:scale-[.98]
  `,

    ghost: `
    bg-transparent
    text-secondary
    hover:bg-white/[0.05]
    hover:text-primary
    active:scale-[.98]
  `,

    outline: `
    border
    border-border
    bg-transparent
    text-primary
    hover:bg-white/[0.04]
    active:scale-[.98]
  `,

    destructive: `
    bg-red-500
    text-white
    hover:bg-red-600
    active:scale-[.98]
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
    default: "h-11 px-5 text-sm",

    sm: "h-9 px-4 text-sm",

    lg: "h-12 px-6 text-base",

    icon: "h-11 w-11",
};

const Button = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            className,
            variant = "default",
            size = "default",
            asChild = false,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                disabled={disabled}
                className={cn(
                    `
            inline-flex
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            rounded-2xl
            font-medium
            transition-all
            duration-300
            outline-none
            select-none

            disabled:pointer-events-none
            disabled:opacity-50

            focus-visible:ring-2
            focus-visible:ring-blue-500/40
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          `,
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };