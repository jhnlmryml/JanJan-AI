import Chat from "@/components/chat/chat";

export default function ChatPage() {
    return (
        <main className="isolate relative flex h-[100dvh] w-full overflow-hidden bg-[#05070a]">
            {/* Ambient Backlight & Glow Effects */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden select-none"
            >
                {/* Top Glowing Aura */}
                <div className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px] md:h-[700px] md:w-[700px] md:blur-[180px]" />

                {/* Bottom Secondary Glow */}
                <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[120px] md:h-[500px] md:w-[500px] md:blur-[160px]" />
            </div>

            {/* Main Application Container */}
            <div className="relative z-10 flex h-full w-full flex-1 flex-col overflow-hidden">
                <Chat />
            </div>
        </main>
    );
}