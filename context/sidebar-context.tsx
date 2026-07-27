"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type SidebarContextType = {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleCollapse: () => void;
    toggleMobile: () => void;
    closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
const STORAGE_KEY = "janjan_sidebar_state";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

    // Asynchronously hydrate state to prevent ESLint set-state-in-effect warning
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved !== null) {
                const parsed = Boolean(JSON.parse(saved));
                requestAnimationFrame(() => {
                    setIsCollapsed(parsed);
                });
            }
        } catch (error) {
            console.error("Failed to read sidebar state from localStorage", error);
        }
    }, []);

    const toggleCollapse = useCallback(() => {
        setIsCollapsed((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch (error) {
                console.error("Failed to save sidebar state to localStorage", error);
            }
            return next;
        });
    }, []);

    const toggleMobile = useCallback(() => setIsMobileOpen((prev) => !prev), []);
    const closeMobile = useCallback(() => setIsMobileOpen(false), []);

    // Hotkey Support: ⌘B / Ctrl+B
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
                e.preventDefault();
                toggleCollapse();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleCollapse]);

    return (
        <SidebarContext.Provider
            value={{ isCollapsed, isMobileOpen, toggleCollapse, toggleMobile, closeMobile }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
}