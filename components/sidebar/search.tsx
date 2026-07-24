"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function SidebarSearch({
                                          value,
                                          onChange,
                                          placeholder = "Search conversations...",
                                      }: SearchProps) {
    return (
        <div
            className="
        glass
        glow
        flex
        h-12
        items-center
        gap-3
        rounded-2xl
        border
        border-border
        px-4
        transition-all
        duration-300
        focus-within:border-blue-500/30
      "
        >
            <Search
                size={18}
                className="text-secondary"
            />

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    `
            h-full
            w-full
            bg-transparent

            text-sm
            text-primary

            placeholder:text-secondary

            outline-none
            border-none
          `
                )}
            />
        </div>
    );
}