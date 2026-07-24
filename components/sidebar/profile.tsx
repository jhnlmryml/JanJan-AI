"use client";

import { Settings, Sparkles } from "lucide-react";

import { APP } from "@/config/site";
import Logo from "@/components/chat/shared/logo";

export default function SidebarProfile() {
    return (
        <div
            className="
        glass
        border-t
        border-border
        p-4
      "
        >
            <div className="flex items-center gap-4">

                <Logo />

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-semibold text-primary">
                        {APP.name}
                    </h3>

                    <p className="truncate text-xs text-secondary">
                        {APP.description}
                    </p>

                </div>

                <button
                    className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/5
            bg-white/[0.03]
            text-secondary
            transition-all
            duration-300
            hover:border-blue-500/20
            hover:bg-blue-500/10
            hover:text-white
          "
                >
                    <Settings size={17} />
                </button>

            </div>

            <div
                className="
          mt-4
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-blue-500/10
          bg-blue-500/[0.05]
          px-4
          py-3
        "
            >
                <div>

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                        Model
                    </p>

                    <p className="mt-1 text-sm text-primary">
                        {APP.model}
                    </p>

                </div>

                <div
                    className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-500/10
            text-blue-400
          "
                >
                    <Sparkles size={18} />
                </div>

            </div>
        </div>
    );
}