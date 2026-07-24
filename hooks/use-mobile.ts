"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1024;

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function update() {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        }

        update();

        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("resize", update);
        };
    }, []);

    return isMobile;
}