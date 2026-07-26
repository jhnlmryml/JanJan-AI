import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import { APP } from "@/config/site";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
    preload: true,
});

const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: APP.name,
        template: `%s • ${APP.name}`,
    },

    description: APP.description,

    applicationName: APP.name,

    referrer: "origin-when-cross-origin",

    keywords: [
        "AI Assistant",
        "Artificial Intelligence",
        "Chat",
        "Next.js",
        "TypeScript",
        "Groq",
        APP.name,
    ],

    authors: [
        {
            name: APP.name,
        },
    ],

    creator: APP.name,

    publisher: APP.name,

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: APP.name,
        description: APP.description,

        url: siteUrl,

        siteName: APP.name,

        locale: "en_US",

        type: "website",
    },

    twitter: {
        card: "summary_large_image",

        title: APP.name,

        description: APP.description,
    },

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    colorScheme: "dark",
    themeColor: "#05070a",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="dark h-full overflow-hidden antialiased"
        >
        <body
            className={`
                    ${geist.variable}
                    h-[100dvh]
                    w-full
                    overflow-hidden
                    bg-[#05070a]
                    font-sans
                    text-slate-100
                    antialiased
                    selection:bg-blue-500/30
                    selection:text-white
                `}
        >
        {children}
        </body>
        </html>
    );
}