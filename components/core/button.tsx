"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
    default: `
        bg-blue-600 text-white shadow-md shadow-blue-600/20 
        hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 
        active:scale-[0.97]
    `,
    secondary: `
        bg-white/10 text-slate-100 backdrop-blur-md 
        hover:bg-white/15 active:scale-[0.97]
    `,
    ghost: `
        bg-transparent text-slate-400 
        hover:bg-white/5 hover:text-slate-100 active:scale-[0.97]
    `,
    outline: `
        border border-white/10 bg-transparent text-slate-200 
        hover:border-white/20 hover:bg-white/5 active:scale-[0.97]
    `,
    destructive: `
        bg-rose-600 text-white shadow-md shadow-rose-600/20 
        hover:bg-rose-500 active:scale-[0.97]
    `,
};

const sizeClasses: Record<ButtonSize, string> = {
    default: "h-11 px-5 text-sm rounded-xl",
    sm: "h-9 px-3.5 text-xs rounded-lg",
    lg: "h-12 px-6 text-base rounded-2xl",
    icon: "h-11 w-11 rounded-xl sm:rounded-2xl",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                disabled={disabled}
                className={cn(
                    `
                        inline-flex items-center justify-center gap-2 whitespace-nowrap 
                        font-medium transition-all duration-200 outline-none select-none
                        focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 
                        focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-40
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