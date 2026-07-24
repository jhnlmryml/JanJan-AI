"use client";

import {
    MessageSquare,
    MessageSquarePlus,
    Search,
    Settings,
    SunMedium,
} from "lucide-react";

import {APP} from "@/config/site";
import {conversations} from "@/lib/mock-data";

import Logo from "@/components/chat/shared/logo";

export default function AppSidebar() {
    return (
        <aside
            className="
        sidebar
        hidden
        h-screen
        w-[320px]
        shrink-0
        border-r
        border-border
        lg:flex
      "
        >
            <div className="flex w-full flex-col p-5">

                {/* Header */}

                <div>

                    <div className="flex items-center gap-4">

                        <Logo/>

                        <div className="min-w-0">

                            <h2 className="truncate text-lg font-semibold text-primary">
                                {APP.name}
                            </h2>

                            <p className="truncate text-sm text-secondary">
                                {APP.description}
                            </p>

                        </div>

                    </div>

                    <button
                        className="
              glow
              mt-8
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-accent
              font-medium
              text-white
              transition-all
              duration-300
              hover:bg-accent-hover
              active:scale-[.98]
            "
                    >
                        <MessageSquarePlus size={18}/>

                        <span>New Chat</span>

                    </button>

                </div>

                {/* Search */}

                <div className="mt-6">

                    <button
                        className="
              glass
              glow
              flex
              h-12
              w-full
              items-center
              gap-3
              rounded-2xl
              px-4
              text-secondary
              transition-all
            "
                    >
                        <Search size={18}/>

                        <span className="text-sm">
              Search conversations
            </span>

                    </button>

                </div>

                {/* Chats */}

                <div className="mt-8 flex-1 overflow-y-auto">

                    <p
                        className="
              mb-3
              px-3
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-secondary
            "
                    >
                        Recent
                    </p>

                    <div className="space-y-1">

                        {conversations.map((chat) => (
                            <button
                                key={chat.id}
                                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-2xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  duration-300
                  hover:bg-white/5
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
                    transition-all
                    group-hover:bg-blue-500/15
                  "
                                >
                                    <MessageSquare
                                        size={16}
                                        className="
                      text-secondary
                      group-hover:text-blue-400
                    "
                                    />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <p
                                        className="
                      truncate
                      text-sm
                      font-medium
                      text-primary
                    "
                                    >
                                        {chat.title}
                                    </p>

                                    <p className="mt-0.5 text-xs text-secondary">
                                        {chat.date}
                                    </p>

                                </div>

                            </button>
                        ))}

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t border-border pt-5">

                    <button
                        className="
              flex
              h-11
              w-full
              items-center
              gap-3
              rounded-2xl
              px-3
              text-secondary
              transition-all
              hover:bg-white/5
              hover:text-primary
            "
                    >
                        <Settings size={18}/>

                        <span className="text-sm font-medium">
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
              text-secondary
              transition-all
              hover:bg-white/5
              hover:text-primary
            "
                    >
                        <SunMedium size={18}/>

                        <span className="text-sm font-medium">
              Appearance
            </span>

                    </button>

                </div>

            </div>
        </aside>
    );
}