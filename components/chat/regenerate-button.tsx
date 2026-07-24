"use client";

import { RotateCcw, Loader2 } from "lucide-react";

type RegenerateButtonProps = {
    loading?: boolean;
    onClick: () => void;
};

export default function RegenerateButton({
                                             loading = false,
                                             onClick,
                                         }: RegenerateButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className="
        group
        inline-flex
        items-center
        gap-2

        rounded-xl
        border
        border-white/5

        bg-white/[0.03]

        px-4
        py-2.5

        text-sm
        font-medium
        text-secondary

        transition-all
        duration-300

        hover:border-blue-500/20
        hover:bg-blue-500/10
        hover:text-white

        disabled:pointer-events-none
        disabled:opacity-60
      "
        >
            {loading ? (
                <Loader2
                    size={16}
                    className="animate-spin"
                />
            ) : (
                <RotateCcw
                    size={16}
                    className="transition-transform duration-300 group-hover:-rotate-180"
                />
            )}

            <span>
        {loading ? "Regenerating..." : "Regenerate"}
      </span>
        </button>
    );
}