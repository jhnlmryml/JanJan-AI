export const APP = {
    name: "Janjan",

    description:
        "Your intelligent AI assistant",

    creator: "Jhon",

    version: "1.0.0",

    model: "Llama 3.3 70B",

    provider: "Groq",

    website: "",

    github: "",

    logo: "/logo.svg",

    api: {
        chat: "/api/chat",
    },

    ui: {
        maxWidth: 900,
        sidebarWidth: 320,
        mobileBreakpoint: 1024,
    },

    chat: {
        maxInputLength: 10000,
        placeholder: "Ask Janjan anything...",
        welcome:
            "How can I help you today?",
    },

    theme: {
        accent: "#3B82F6",
        background: "#09090B",
        surface: "#111113",
        card: "#18181B",
    },

    animation: {
        duration: 0.25,
        easing: "cubic-bezier(.4,0,.2,1)",
    },
} as const;