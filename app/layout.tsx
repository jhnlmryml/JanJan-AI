import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { APP } from "@/config/site";

import "./globals.css";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: APP.name,
        template: `%s • ${APP.name}`,
    },
    description: APP.description,
    applicationName: APP.name,
    metadataBase: new URL("https://example.com"),
    keywords: [
        "AI",
        "Assistant",
        "Next.js",
        "TypeScript",
        "Groq",
        "Chat",
    ],
    openGraph: {
        title: APP.name,
        description: APP.description,
        type: "website",
        siteName: APP.name,
    },
    twitter: {
        card: "summary_large_image",
        title: APP.name,
        description: APP.description,
    },
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
        >
        <body
            className={`${geist.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}