export interface AIModel {
    id: string;
    name: string;
    provider: string;
    description: string;
    contextWindow: number;
    supportsVision: boolean;
    supportsTools: boolean;
    supportsReasoning: boolean;
    enabled: boolean;
}

export const MODELS: AIModel[] = [
    {
        id: "llama-3.3-70b-versatile",
        name: "Llama 3.3 70B",
        provider: "Groq",
        description:
            "Balanced model for programming, reasoning, writing, and everyday conversations.",
        contextWindow: 128000,
        supportsVision: false,
        supportsTools: true,
        supportsReasoning: true,
        enabled: true,
    },

    {
        id: "deepseek-r1-distill-llama-70b",
        name: "DeepSeek R1 Distill 70B",
        provider: "Groq",
        description:
            "Optimized for complex reasoning, mathematics, debugging, and structured problem solving.",
        contextWindow: 128000,
        supportsVision: false,
        supportsTools: true,
        supportsReasoning: true,
        enabled: true,
    },

    {
        id: "meta-llama/llama-4-scout-17b-16e-instruct",
        name: "Llama 4 Scout",
        provider: "Groq",
        description:
            "Fast multimodal model designed for high-quality responses with excellent speed.",
        contextWindow: 128000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
        enabled: true,
    },

    {
        id: "openai/gpt-oss-120b",
        name: "GPT-OSS 120B",
        provider: "Groq",
        description:
            "Large open-weight reasoning model with strong coding and analytical capabilities.",
        contextWindow: 131072,
        supportsVision: false,
        supportsTools: true,
        supportsReasoning: true,
        enabled: true,
    },
];

export const DEFAULT_MODEL = MODELS[0];

export function getModel(id: string) {
    return (
        MODELS.find((model) => model.id === id) ??
        DEFAULT_MODEL
    );
}

export function getEnabledModels() {
    return MODELS.filter((model) => model.enabled);
}