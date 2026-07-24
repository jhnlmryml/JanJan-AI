"use client";

import { useEffect, useState } from "react";

export default function Spotlight() {
    const [position, setPosition] = useState({
        x: -1000,
        y: -1000,
    });

    useEffect(() => {
        function handlePointerMove(e: PointerEvent) {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }

        window.addEventListener("pointermove", handlePointerMove);

        return () => {
            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div
                className="
          absolute
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-70
          blur-[120px]
          transition-[left,top]
          duration-150
          ease-out
        "
                style={{
                    left: position.x,
                    top: position.y,
                    background: `
            radial-gradient(
              circle,
              rgba(59,130,246,.18) 0%,
              rgba(59,130,246,.08) 35%,
              transparent 75%
            )
          `,
                }}
            />
        </div>
    );
}