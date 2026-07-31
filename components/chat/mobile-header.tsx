"use client";

import React from "react";
import { PanelLeft, Sparkles, MessageCirclePlus } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import { useChatStore } from "@/context/chat-context";
import { APP } from "@/config/site";

export default function MobileHeader() {
    const { toggleMobile } = useSidebar();
    const { hasActiveMessages, createNewChat } = useChatStore();

    return (
        <header className="relative flex h-14 w-full items-center justify-between bg-[#05070a]/50 px-4 backdrop-blur-xl lg:hidden shrink-0 z-20">
            {/* Toggle Sidebar */}
            <button
                type="button"
                onClick={toggleMobile}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white active:scale-95 transition-all"
                aria-label="Open sidebar drawer"
            >
                <PanelLeft className="h-4 w-4 text-blue-400" />
            </button>

            {/* Centered Brand Title */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-bold text-slate-100 pointer-events-none select-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="tracking-tight">{APP.name}</span>
            </div>

            {/* Mobile New Chat Action */}
            <button
                type="button"
                onClick={createNewChat}
                disabled={!hasActiveMessages}
                className={`
                    flex h-9 w-9 items-center justify-center rounded-xl transition-all
                    ${
                    hasActiveMessages
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 active:scale-95 cursor-pointer"
                        : "bg-white/[0.03] text-slate-600 border border-white/5 cursor-not-allowed opacity-50"
                }
                `}
                aria-label="New chat session"
            >
                <MessageCirclePlus className="h-4 w-4" />
            </button>
        </header>
    );
}