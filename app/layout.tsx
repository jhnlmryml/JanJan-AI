import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { APP } from "@/config/site";
import { SidebarProvider } from "@/context/sidebar-context";
import {ChatStoreProvider} from "@/context/chat-context";
import Sidebar from "@/components/sidebar/sidebar";
import MobileHeader from "@/components/chat/mobile-header";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
    preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

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
    authors: [{ name: APP.name }],
    creator: APP.name,
    publisher: APP.name,
    robots: {
        index: true,
        follow: true,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`dark h-full overflow-hidden antialiased ${inter.variable} ${jetbrainsMono.variable}`}
        >
        <body className="bg-background text-slate-100 flex h-dvh h-screen w-screen overflow-hidden antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <SidebarProvider>
            <ChatStoreProvider>
                <div className="flex h-full w-full min-h-0 overflow-hidden relative">
                    <Sidebar />

                    <div className="flex flex-1 flex-col min-w-0 min-h-0 h-full overflow-hidden bg-background">
                        <MobileHeader />
                        <main className="flex flex-1 flex-col min-h-0 overflow-hidden relative w-full pb-[env(safe-area-inset-bottom)]">
                            {children}
                        </main>
                    </div>
                </div>
            </ChatStoreProvider>
        </SidebarProvider>
        </body>
        </html>
    );
}