"use client";

import { Sparkles } from "lucide-react";

import { suggestedPrompts } from "@/lib/prompts";

type SuggestedPromptsProps = {
    onSelect: (prompt: string) => void;
};

export default function SuggestedPrompts({
                                             onSelect,
                                         }: SuggestedPromptsProps) {
    return (
        <section className="mx-auto w-full max-w-6xl">
            <div className="mb-6 flex items-center gap-2">
                <Sparkles
                    size={16}
                    className="text-blue-400"
                />

                <span className="text-sm font-medium text-zinc-400">
          Suggested prompts
        </span>
            </div>

            <div
                className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-3
        "
            >
                {suggestedPrompts.map((prompt) => (
                    <button
                        key={prompt.id}
                        type="button"
                        onClick={() => onSelect(prompt.prompt)}
                        className="
              group

              rounded-3xl
              border
              border-white/5

              bg-white/[0.025]

              p-6
              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-blue-500/20
              hover:bg-white/[0.04]
              hover:shadow-[0_0_40px_rgba(59,130,246,.08)]
            "
                    >
                        <div
                            className="
                mb-4

                inline-flex

                rounded-full

                border
                border-blue-500/15

                bg-blue-500/10

                px-3
                py-1

                text-xs
                font-medium
                uppercase
                tracking-wider

                text-blue-300
              "
                        >
                            {prompt.category}
                        </div>

                        <h3
                            className="
                text-lg
                font-semibold
                tracking-tight
                text-white

                transition-colors

                group-hover:text-blue-300
              "
                        >
                            {prompt.title}
                        </h3>

                        <p
                            className="
                mt-2
                text-sm
                leading-6
                text-zinc-400
              "
                        >
                            {prompt.description}
                        </p>
                    </button>
                ))}
            </div>
        </section>
    );
}