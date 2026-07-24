"use client";

import { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

type DeleteDialogProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    onDelete: () => void;
};

export default function DeleteDialog({
                                         open,
                                         title,
                                         onClose,
                                         onDelete,
                                     }: DeleteDialogProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (!open) return;

            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/70
        backdrop-blur-md

        animate-in
        fade-in
      "
        >
            <div
                className="
          w-full
          max-w-md

          overflow-hidden

          rounded-3xl

          border
          border-white/10

          bg-[#111113]

          shadow-[0_0_80px_rgba(0,0,0,.45)]

          animate-in
          zoom-in-95
          duration-200
        "
            >
                {/* Header */}

                <div
                    className="
            flex
            items-center
            justify-between

            border-b
            border-white/5

            px-6
            py-5
          "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-2xl

                bg-red-500/10

                text-red-400
              "
                        >
                            <AlertTriangle size={18} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Delete Conversation
                            </h2>

                            <p className="mt-1 text-sm text-secondary">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              transition-all

              hover:bg-white/5
            "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}

                <div className="px-6 py-6">
                    <p className="text-sm leading-7 text-zinc-400">
                        Are you sure you want to permanently delete
                        <span className="mx-1 font-semibold text-white">
              "{title}"
            </span>
                        ?
                    </p>
                </div>

                {/* Footer */}

                <div
                    className="
            flex
            justify-end
            gap-3

            border-t
            border-white/5

            px-6
            py-5
          "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
              rounded-2xl

              border
              border-white/10

              px-5
              py-3

              text-sm
              font-medium

              transition-all

              hover:bg-white/5
            "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="
              inline-flex
              items-center
              gap-2

              rounded-2xl

              bg-red-600

              px-5
              py-3

              text-sm
              font-medium
              text-white

              transition-all

              hover:bg-red-500
              active:scale-[0.98]
            "
                    >
                        <Trash2 size={16} />

                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}