"use client";

import { useEffect, useState } from "react";

import {
    X,
    Pencil,
} from "lucide-react";

type RenameDialogProps = {
    open: boolean;
    initialValue: string;
    onClose: () => void;
    onSave: (title: string) => void;
};

export default function RenameDialog({
                                         open,
                                         initialValue,
                                         onClose,
                                         onSave,
                                     }: RenameDialogProps) {
    const [title, setTitle] = useState(initialValue);

    useEffect(() => {
        setTitle(initialValue);
    }, [initialValue]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!open) return;

            if (e.key === "Escape") {
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

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const value = title.trim();

        if (!value) return;

        onSave(value);
        onClose();
    }

    return (
        <div
            className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/60
        backdrop-blur-md

        animate-in
        fade-in
      "
        >
            <div
                className="
          w-full
          max-w-md

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

                bg-blue-500/10

                text-blue-400
              "
                        >
                            <Pencil size={18} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Rename Conversation
                            </h2>

                            <p className="mt-1 text-sm text-secondary">
                                Update the title of this chat.
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

              transition

              hover:bg-white/5
            "
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >
                    <input
                        autoFocus
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Conversation title..."
                        className="
              h-12
              w-full

              rounded-2xl

              border
              border-white/10

              bg-white/[0.03]

              px-4

              outline-none

              transition

              focus:border-blue-500/40
              focus:ring-2
              focus:ring-blue-500/20
            "
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                rounded-2xl

                border
                border-white/10

                px-5
                py-3

                transition

                hover:bg-white/5
              "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="
                rounded-2xl

                bg-blue-600

                px-5
                py-3

                font-medium
                text-white

                transition

                hover:bg-blue-500

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}