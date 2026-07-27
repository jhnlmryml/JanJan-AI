"use client";

import React, { useState, useMemo } from "react";
import { MessageSquare, Trash2, Edit3, Sparkles, Check, X } from "lucide-react";
import { useChatStore, ChatSession } from "@/context/chat-context";

type Props = {
    searchQuery: string;
    isCollapsed: boolean;
};

export default function ChatHistoryList({ searchQuery, isCollapsed }: Props) {
    const { chats, activeChatId, selectChat, renameChat, deleteChat } = useChatStore();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const filtered = useMemo(() => {
        if (!searchQuery.trim()) return chats;
        return chats.filter((chat) =>
            chat.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [chats, searchQuery]);

    const handleStartEdit = (e: React.MouseEvent, chat: ChatSession) => {
        e.stopPropagation();
        setEditingId(chat.id);
        setEditTitle(chat.title);
    };

    const handleSaveEdit = (e: React.SyntheticEvent, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        if (editTitle.trim()) {
            renameChat(id, editTitle.trim());
        }
        setEditingId(null);
    };

    const handleCancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(null);
    };

    // Catchy Non-Button Label Empty State
    if (chats.length === 0) {
        if (isCollapsed) return null;

        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
                    <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-200 tracking-wide mb-1">
                    Spark a Conversation
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-medium text-blue-300 select-none">
                    <Sparkles className="h-3 w-3" />
                    <span>Start a chat</span>
                </span>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2 scrollbar-thin scrollbar-thumb-white/10">
            {filtered.map((chat) => {
                const isActive = chat.id === activeChatId;
                const isEditing = editingId === chat.id;

                return (
                    <div
                        key={chat.id}
                        onClick={() => selectChat(chat.id)}
                        className={`
                            group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium cursor-pointer transition-all duration-150
                            ${
                            isActive
                                ? "bg-blue-600/15 text-blue-300 border border-blue-500/30 shadow-sm"
                                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent"
                        }
                        `}
                    >
                        <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />

                        {!isCollapsed && (
                            <>
                                {isEditing ? (
                                    <form
                                        onSubmit={(e) => handleSaveEdit(e, chat.id)}
                                        className="flex items-center gap-1 flex-1 min-w-0"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            onBlur={(e) => handleSaveEdit(e, chat.id)}
                                            autoFocus
                                            className="w-full bg-slate-900 text-xs text-slate-100 border border-blue-500/60 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => handleSaveEdit(e, chat.id)}
                                            className="p-1 text-emerald-400 hover:text-emerald-300 rounded"
                                            title="Save title"
                                        >
                                            <Check className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="p-1 text-slate-400 hover:text-slate-200 rounded"
                                            title="Cancel"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <span className="truncate flex-1 text-left">{chat.title}</span>
                                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity shrink-0">
                                            <button
                                                type="button"
                                                onClick={(e) => handleStartEdit(e, chat)}
                                                className="p-1 text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                                                title="Rename chat"
                                            >
                                                <Edit3 className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteChat(chat.id);
                                                }}
                                                className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                                                title="Delete chat"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}