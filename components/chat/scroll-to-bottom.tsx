"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

type ScrollToBottomProps = {
    containerRef: React.RefObject<HTMLElement | null>;
};

export default function ScrollToBottom({
                                           containerRef,
                                       }: ScrollToBottomProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        function handleScroll() {
            const distance =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight;

            setVisible(distance > 300);
        }

        handleScroll();

        container.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        return () => {
            container.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, [containerRef]);

    function scrollToBottom() {
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }

    return (
        <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className={`
        fixed
        bottom-36
        right-8
        z-40

        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-full

        border
        border-blue-500/20

        bg-background/80
        backdrop-blur-xl

        shadow-[0_0_35px_rgba(59,130,246,.18)]

        transition-all
        duration-300

        hover:scale-105
        hover:border-blue-400/40
        hover:bg-blue-500/10

        ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
            }
      `}
        >
            <ArrowDown
                size={18}
                className="text-blue-300"
            />
        </button>
    );
}