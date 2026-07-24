"use client";

import { Sparkles } from "lucide-react";

import { APP } from "@/config/site";
import Logo from "@/components/chat/shared/logo";
import SuggestedPrompts from "@/components/chat/suggested-prompts";

type WelcomeScreenProps = {
    onPromptSelect: (prompt: string) => void;
};

export default function WelcomeScreen({
                                          onPromptSelect,
                                      }: WelcomeScreenProps) {
    return (
        <section className="relative flex flex-1 items-center justify-center overflow-hidden px-8 py-12">
            <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">

                {/* Logo */}

                <div
                    className="
            mb-10
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.03]
            p-6
            shadow-[0_0_80px_rgba(59,130,246,.15)]
            backdrop-blur-xl
          "
                >
                    <Logo />
                </div>

                {/* Badge */}

                <div
                    className="
            mb-6
            inline-flex
            items-center
            gap-2

            rounded-full
            border
            border-blue-500/20

            bg-blue-500/10

            px-4
            py-2

            text-sm
            font-medium
            text-blue-300
          "
                >
                    <Sparkles size={15} />

                    Powered by {APP.provider}
                </div>

                {/* Heading */}

                <h1
                    className="
            max-w-4xl
            text-center

            text-5xl
            font-bold
            tracking-tight

            text-white

            sm:text-6xl
          "
                >
                    Meet{" "}
                    <span
                        className="
              bg-gradient-to-r
              from-blue-400
              via-cyan-300
              to-white
              bg-clip-text
              text-transparent
            "
                    >
            {APP.name}
          </span>
                </h1>

                {/* Description */}

                <p
                    className="
            mt-6
            max-w-2xl
            text-center

            text-lg
            leading-8

            text-zinc-400
          "
                >
                    {APP.description}
                    <br />
                    Ask anything about programming, AI, design, debugging,
                    architecture, or problem solving.
                </p>

                {/* Suggestions */}

                <div className="mt-20 w-full">
                    <SuggestedPrompts
                        onSelect={onPromptSelect}
                    />
                </div>

            </div>
        </section>
    );
}