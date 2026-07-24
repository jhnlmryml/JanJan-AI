"use client";

import { Loader2, Square } from "lucide-react";

type StopGeneratingProps = {
    loading?: boolean;
    onStop: () => void;
};

export default function StopGenerating({
                                           loading = false,
                                           onStop,
                                       }: StopGeneratingProps) {
    return (
        <button
            type="button"
            onClick={onStop}
            disabled={!loading}
            className="
        group
        inline-flex
        items-center
        gap-2

        rounded-xl
        border
        border-red-500/15

        bg-red-500/10

        px-4
        py-2.5

        text-sm
        font-medium
        text-red-300

        transition-all
        duration-300

        hover:border-red-500/30
        hover:bg-red-500/20
        hover:text-red-200

        disabled:pointer-events-none
        disabled:opacity-50
      "
        >
            {loading ? (
                <Loader2
                    size={16}
                    className="animate-spin"
                />
            ) : (
                <Square
                    size={15}
                    fill="currentColor"
                />
            )}

            <span>
        {loading ? "Stop Generating" : "Stopped"}
      </span>
        </button>
    );
}