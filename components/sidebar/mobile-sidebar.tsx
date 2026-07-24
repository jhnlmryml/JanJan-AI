"use client";

import { useState } from "react";
import {
    Menu,
    X,
    MessageSquarePlus,
    Search,
    Settings,
    SunMedium,
} from "lucide-react";

import { APP } from "@/config/site";
import { conversations } from "@/lib/mock-data";

import Logo from "@/components/chat/shared/logo";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}

            <header
                className="
          fixed
          inset-x-0
          top-0
          z-50
          flex
          h-16
          items-center
          justify-between
          border-b
          border-border
          bg-background/70
          px-5
          backdrop-blur-xl
          lg:hidden
        "
            >
                <div className="flex items-center gap-3">
                    <Logo />

                    <div>
                        <h2 className="text-sm font-semibold">
                            {APP.name}
                        </h2>

                        <p className="text-xs text-secondary">
                            {APP.description}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            transition-all
            hover:bg-white/[0.06]
          "
                >
                    <Menu size={20} />
                </button>
            </header>

            {/* Overlay */}

            <div
                onClick={() => setOpen(false)}
                className={`
          fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${
                    open
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }
        `}
            />

            {/* Drawer */}

            <aside
                className={`
          fixed
          left-0
          top-0
          z-[60]
          flex
          h-screen
          w-[320px]
          flex-col
          border-r
          border-border
          bg-background
          transition-transform
          duration-300
          lg:hidden

          ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
        `}
            >
                {/* Header */}

                <div className="flex items-center justify-between p-5">

                    <div className="flex items-center gap-3">

                        <Logo />

                        <div>

                            <h2 className="font-semibold">
                                {APP.name}
                            </h2>

                            <p className="text-xs text-secondary">
                                {APP.description}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              hover:bg-white/[0.05]
            "
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* New Chat */}

                <div className="px-5">

                    <button
                        className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-accent
              text-white
              transition-all
              hover:bg-accent-hover
            "
                    >
                        <MessageSquarePlus size={18} />
                        New Chat
                    </button>

                </div>

                {/* Search */}

                <div className="mt-6 px-5">

                    <div
                        className="
              glass
              flex
              h-11
              items-center
              gap-3
              rounded-2xl
              px-4
            "
                    >
                        <Search
                            size={17}
                            className="text-secondary"
                        />

                        <span className="text-sm text-secondary">
              Search chats
            </span>

                    </div>

                </div>

                {/* Conversations */}

                <div className="mt-8 flex-1 overflow-y-auto px-4">

                    <p className="mb-3 px-2 text-xs uppercase tracking-[0.25em] text-secondary">
                        Recent
                    </p>

                    <div className="space-y-1">

                        {conversations.map((chat) => (
                            <button
                                key={chat.id}
                                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-2xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  hover:bg-white/[0.05]
                "
                            >
                                <div
                                    className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.03]
                  "
                                >
                                    <MessageSquarePlus size={16} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm">
                                        {chat.title}
                                    </p>

                                    <p className="text-xs text-secondary">
                                        {chat.date}
                                    </p>

                                </div>

                            </button>
                        ))}

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t border-border p-4">

                    <button
                        className="
              flex
              h-11
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              hover:bg-white/[0.05]
            "
                    >
                        <Settings size={18} />

                        <span className="text-sm">
              Settings
            </span>

                    </button>

                    <button
                        className="
              mt-1
              flex
              h-11
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              hover:bg-white/[0.05]
            "
                    >
                        <SunMedium size={18} />

                        <span className="text-sm">
              Appearance
            </span>

                    </button>

                </div>
            </aside>
        </>
    );
}