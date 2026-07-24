type AppShellProps = {
    sidebar: React.ReactNode;
    children: React.ReactNode;
};

export default function AppShell({
                                     sidebar,
                                     children,
                                 }: AppShellProps) {
    return (
        <main
            className="
        flex
        h-screen
        overflow-hidden
        bg-background
        text-primary
      "
        >
            {sidebar}

            <section
                className="
          relative
          flex
          min-w-0
          flex-1
          overflow-hidden
        "
            >
                {/* Ambient background */}
                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
                >
                    <div
                        className="
              absolute
              left-[-10rem]
              top-[-8rem]
              h-[28rem]
              w-[28rem]
              rounded-full
              bg-blue-600/10
              blur-[120px]
            "
                    />

                    <div
                        className="
              absolute
              bottom-[-12rem]
              right-[-8rem]
              h-[30rem]
              w-[30rem]
              rounded-full
              bg-cyan-500/10
              blur-[140px]
            "
                    />

                    <div
                        className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(255,255,255,.04),transparent_45%)]
            "
                    />
                </div>

                <div className="relative flex min-w-0 flex-1">
                    {children}
                </div>
            </section>
        </main>
    );
}