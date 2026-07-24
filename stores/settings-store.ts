"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_MODEL } from "@/lib/models";

export type ThemeMode = "system" | "dark" | "light";

interface SettingsState {
    theme: ThemeMode;
    model: string;
    sendWithEnter: boolean;
    showLineNumbers: boolean;
    wordWrap: boolean;
    markdown: boolean;
    animations: boolean;
    compactMode: boolean;
    sidebarCollapsed: boolean;

    setTheme: (theme: ThemeMode) => void;
    setModel: (model: string) => void;
    setSendWithEnter: (value: boolean) => void;
    setShowLineNumbers: (value: boolean) => void;
    setWordWrap: (value: boolean) => void;
    setMarkdown: (value: boolean) => void;
    setAnimations: (value: boolean) => void;
    setCompactMode: (value: boolean) => void;
    setSidebarCollapsed: (value: boolean) => void;

    reset: () => void;
}

const initialState = {
    theme: "dark" as ThemeMode,
    model: DEFAULT_MODEL.id,
    sendWithEnter: true,
    showLineNumbers: true,
    wordWrap: true,
    markdown: true,
    animations: true,
    compactMode: false,
    sidebarCollapsed: false,
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            ...initialState,

            setTheme: (theme) =>
                set({
                    theme,
                }),

            setModel: (model) =>
                set({
                    model,
                }),

            setSendWithEnter: (sendWithEnter) =>
                set({
                    sendWithEnter,
                }),

            setShowLineNumbers: (showLineNumbers) =>
                set({
                    showLineNumbers,
                }),

            setWordWrap: (wordWrap) =>
                set({
                    wordWrap,
                }),

            setMarkdown: (markdown) =>
                set({
                    markdown,
                }),

            setAnimations: (animations) =>
                set({
                    animations,
                }),

            setCompactMode: (compactMode) =>
                set({
                    compactMode,
                }),

            setSidebarCollapsed: (sidebarCollapsed) =>
                set({
                    sidebarCollapsed,
                }),

            reset: () =>
                set({
                    ...initialState,
                }),
        }),
        {
            name: "janjan-settings",
            version: 1,
        }
    )
);