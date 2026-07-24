import { APP } from "@/config/site";

import Logo from "@/components/chat/shared/logo";
import PromptChip from "./promp-chip";

const prompts = [
    "Build a premium SaaS landing page",
    "Create a Next.js dashboard",
    "Explain React Server Components",
    "Optimize my TypeScript code",
];

export default function EmptyState() {
    return (
        <section className="flex flex-1 items-center justify-center px-8">
            <div className="container-chat flex flex-col items-center text-center">

                <div className="glow glass flex h-24 w-24 items-center justify-center rounded-[30px] p-5">
                    <Logo />
                </div>

                <h1 className="mt-10 text-6xl font-semibold tracking-tight text-primary">
                    Hi, I'm {APP.name}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary">
                    {APP.description}
                </p>

                <div className="mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
                    {prompts.map((prompt) => (
                        <PromptChip
                            key={prompt}
                            title={prompt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}