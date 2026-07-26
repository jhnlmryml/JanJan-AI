import Image from "next/image";

import { cn } from "@/lib/utils";
import { APP } from "@/config/site";

type LogoProps = {
    size?: "sm" | "md" | "lg";
    className?: string;
};

const sizeClasses = {
    sm: {
        container: "h-10 w-10 rounded-xl",
        image: 24,
    },
    md: {
        container: "h-12 w-12 rounded-2xl",
        image: 30,
    },
    lg: {
        container: "h-16 w-16 rounded-[22px]",
        image: 42,
    },
} as const;

export default function Logo({
                                 size = "md",
                                 className,
                             }: LogoProps) {
    const current = sizeClasses[size];

    return (
        <div
            className={cn(
                `
        glass
        glow

        flex
        shrink-0
        items-center
        justify-center

        overflow-hidden

        border
        border-white/10
        `,
                current.container,
                className
            )}
        >
            <Image
                src="/logo.svg"
                alt={`${APP.name} logo`}
                width={current.image}
                height={current.image}
                priority
                draggable={false}
                className="
          select-none
          object-contain
        "
            />
        </div>
    );
}