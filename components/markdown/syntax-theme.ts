import "highlight.js/styles/github-dark.css";

export const syntaxTheme = {
    inlineCode: `
    rounded-md
    border
    border-white/10
    bg-white/[0.05]
    px-1.5
    py-0.5
    font-mono
    text-[0.9em]
    text-sky-300
  `,

    pre: `
    overflow-hidden
    rounded-2xl
    border
    border-white/10
    bg-[#0B1220]
    shadow-[0_20px_60px_rgba(0,0,0,.45)]
  `,

    code: `
    block
    overflow-x-auto
    p-5
    text-[14px]
    leading-7
    font-mono
  `,

    header: `
    flex
    items-center
    justify-between
    border-b
    border-white/5
    bg-white/[0.03]
    px-5
    py-3
  `,
} as const;