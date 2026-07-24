"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);

            if (item !== null) {
                setValue(JSON.parse(item));
            }
        } catch {
            // Ignore malformed localStorage values.
        }
    }, [key]);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch {
            // Ignore write errors (private mode, quota exceeded, etc.)
        }
    }, [key, value]);

    return [value, setValue] as const;
}