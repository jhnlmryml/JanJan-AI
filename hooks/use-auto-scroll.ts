"use client";

import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(
    dependency: unknown
) {
    const containerRef = useRef<T>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const isNearBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
            200;

        if (!isNearBottom) return;

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [dependency]);

    return {
        containerRef,
        bottomRef,
    };
}