export const APP = {
    name: "Janjan",
    tagline: "Next-Gen Intelligence",
    description:
        "Your intelligent AI assistant powered by high-speed inference. Ask questions, write code, analyze data, or brainstorm ideas instantly.",

    creator: "Jhon",
    version: "1.0.0",

    model: "Llama 3.3 70B",
    provider: "Groq",

    logo: "/logo.svg",

    api: {
        chat: "/api/chat",
    },

    ui: {
        maxWidth: 900,
        sidebarWidth: 320,
        collapsedWidth: 72,
        mobileBreakpoint: 1024,
    },

    chat: {
        maxInputLength: 10000,
        placeholder: "Ask Janjan anything...",
        welcome: "How can I help you today?",
    },

    theme: {
        accent: "#3B82F6",
        background: "#05070A",
        surface: "#0D1117",
        card: "#161B22",
    },

    animation: {
        duration: 0.25,
        easing: "cubic-bezier(.4,0,.2,1)",
    },
} as const;