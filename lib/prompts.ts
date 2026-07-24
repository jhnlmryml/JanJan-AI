export type PromptCategory =
    | "development"
    | "design"
    | "ai"
    | "database"
    | "career";

export interface SuggestedPrompt {
    id: string;
    title: string;
    description: string;
    prompt: string;
    category: PromptCategory;
}

export const suggestedPrompts: SuggestedPrompt[] = [
    {
        id: "landing-page",
        category: "development",
        title: "Build Landing Page",
        description: "Modern SaaS landing page",
        prompt:
            "Build a premium SaaS landing page using Next.js, TypeScript, Tailwind CSS, GSAP, and Framer Motion. Make it responsive, animated, and production-ready.",
    },

    {
        id: "dashboard",
        category: "development",
        title: "Dashboard",
        description: "Admin dashboard UI",
        prompt:
            "Create a premium admin dashboard with analytics cards, charts, responsive sidebar, dark theme, and clean component architecture.",
    },

    {
        id: "portfolio",
        category: "design",
        title: "Portfolio Website",
        description: "Developer portfolio",
        prompt:
            "Help me build a luxury portfolio website with cinematic animations, Three.js effects, smooth scrolling, and excellent UX.",
    },

    {
        id: "debug",
        category: "development",
        title: "Debug Code",
        description: "Find and fix issues",
        prompt:
            "Analyze my code, explain the issue, and provide the cleanest and most optimized solution with best practices.",
    },

    {
        id: "refactor",
        category: "development",
        title: "Refactor Code",
        description: "Improve architecture",
        prompt:
            "Refactor this code using modern React, Next.js App Router, TypeScript, reusable components, and clean architecture.",
    },

    {
        id: "api",
        category: "development",
        title: "REST API",
        description: "Backend architecture",
        prompt:
            "Create a scalable REST API using Next.js Route Handlers, validation, error handling, and best practices.",
    },

    {
        id: "database",
        category: "database",
        title: "Database Schema",
        description: "PostgreSQL design",
        prompt:
            "Design an optimized PostgreSQL database schema for a SaaS application including authentication, subscriptions, and chat history.",
    },

    {
        id: "ai-chatbot",
        category: "ai",
        title: "AI Chatbot",
        description: "Production AI app",
        prompt:
            "Help me build a production-ready AI chatbot using AI SDK 7, Groq, Next.js 15, TypeScript, Tailwind CSS, and streaming responses.",
    },

    {
        id: "performance",
        category: "development",
        title: "Performance",
        description: "Optimization",
        prompt:
            "Audit my application and suggest improvements for Core Web Vitals, bundle size, rendering performance, and accessibility.",
    },

    {
        id: "interview",
        category: "career",
        title: "Interview",
        description: "Frontend preparation",
        prompt:
            "Conduct a senior frontend developer interview covering React, Next.js, TypeScript, performance optimization, architecture, and JavaScript.",
    },
];