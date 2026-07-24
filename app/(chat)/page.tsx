import AppShell from "@/components/layout/app-shell";
import AppSidebar from "@/components/layout/app-sidebar";
import Chat from "@/components/chat/chat";

export default function ChatPage() {
    return (
        <AppShell sidebar={<AppSidebar />}>
            <Chat />
        </AppShell>
    );
}