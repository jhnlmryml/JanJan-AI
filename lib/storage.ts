const STORAGE_KEYS = {
    conversations: "janjan:conversations",
    activeConversation: "janjan:active-conversation",
    settings: "janjan:settings",
} as const;

export const storage = {
    get<T>(key: string, fallback: T): T {
        if (typeof window === "undefined") {
            return fallback;
        }

        try {
            const value = localStorage.getItem(key);

            if (!value) return fallback;

            return JSON.parse(value) as T;
        } catch {
            return fallback;
        }
    },

    set<T>(key: string, value: T) {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch {
            // Ignore storage errors.
        }
    },

    remove(key: string) {
        if (typeof window === "undefined") return;

        localStorage.removeItem(key);
    },

    clear() {
        if (typeof window === "undefined") return;

        Object.values(STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
    },
};

export { STORAGE_KEYS };