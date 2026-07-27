"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Plus, PanelLeftClose, PanelLeft, Search, Sparkles } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import { useChatStore } from "@/context/chat-context";
import { APP } from "@/config/site";
import ChatHistoryList from "./chat-history-list";
import SidebarFooter from "./sidebar-footer";

export default function Sidebar() {
    const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();
    const { hasActiveMessages, createNewChat } = useChatStore();

    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    const isCollapsedMode = isCollapsed && !isMobileOpen;

    const handleNewChatClick = useCallback(() => {
        if (!hasActiveMessages) return; // Prevent creating duplicate empty sessions
        createNewChat();
        if (isMobileOpen) closeMobile();
    }, [hasActiveMessages, createNewChat, isMobileOpen, closeMobile]);

    // Keyboard Shortcuts (⌘K & ⌘N)
    useEffect(() => {
        const handleHotkeys = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
                e.preventDefault();
                handleNewChatClick();
            }
        };
        window.addEventListener("keydown", handleHotkeys);
        return () => window.removeEventListener("keydown", handleHotkeys);
    }, [handleNewChatClick]);

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    onClick={closeMobile}
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden transition-opacity"
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 flex flex-col
                    border-r border-white/[0.08] bg-[#05070a]/95 backdrop-blur-2xl
                    transition-all duration-300 ease-in-out shrink-0 select-none
                    ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
                    ${isCollapsedMode ? "lg:w-[68px]" : "lg:w-72"}
                `}
            >
                {/* Sidebar Header */}
                <div className="flex h-16 items-center justify-between px-3.5 shrink-0">
                    {!isCollapsedMode && (
                        <div className="flex items-center gap-2.5 min-w-0 pl-1">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                                <Sparkles className="h-4 w-4"/>
                            </div>
                            <div className="flex flex-col min-w-0 overflow-hidden">
                                    <span className="font-bold text-sm tracking-tight text-slate-100 truncate">
                                        {APP.name}
                                    </span>
                                <span className="text-[10px] text-blue-400 font-medium truncate">
                                        {APP.tagline}
                                    </span>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={toggleCollapse}
                        className="hidden lg:flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white transition-all ml-auto"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                    </button>
                </div>

                {/* Dynamic New Chat Button */}
                <div className="px-3 pb-2 shrink-0">
                    <button
                        type="button"
                        onClick={handleNewChatClick}
                        disabled={!hasActiveMessages}
                        title={hasActiveMessages ? "Start a new conversation" : "Already on a new chat"}
                        className={`
                            flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold
                            transition-all duration-200 border
                            ${
                            hasActiveMessages
                                ? "bg-blue-600 text-white border-blue-500/50 shadow-lg shadow-blue-600/20 hover:bg-blue-500 active:scale-[0.98] cursor-pointer"
                                : "bg-white/[0.03] text-slate-500 border-white/5 opacity-60 cursor-not-allowed"
                        }
                        `}
                    >
                        <Plus className="h-4 w-4 shrink-0" />
                        {!isCollapsedMode && <span>New Chat</span>}
                    </button>
                </div>

                {/* Search Field */}
                {!isCollapsedMode && (
                    <div className="px-3 pb-2 shrink-0">
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2 pl-8 pr-12 text-xs text-slate-200 placeholder-slate-400 outline-none transition-all focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-blue-500/40"
                            />
                            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                )}

                {/* Chat History List */}
                <ChatHistoryList searchQuery={searchQuery} isCollapsed={isCollapsedMode} />

                {/* Footer */}
                <SidebarFooter isCollapsed={isCollapsedMode} />
            </aside>
        </>
    );
}