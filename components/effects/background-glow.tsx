"use client";

export default function BackgroundGlow() {
    return (
        <div
            aria-hidden
            className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
        >
            {/* Top Left */}

            <div
                className="
          absolute
          -left-56
          -top-56
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-600/15
          blur-[180px]
          animate-pulse
        "
            />

            {/* Top Right */}

            <div
                className="
          absolute
          -right-64
          top-0
          h-[650px]
          w-[650px]
          rounded-full
          bg-cyan-500/10
          blur-[170px]
        "
            />

            {/* Bottom */}

            <div
                className="
          absolute
          bottom-[-320px]
          left-1/2
          h-[800px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-[220px]
        "
            />

            {/* Center Glow */}

            <div
                className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.02]
          blur-[120px]
        "
            />
        </div>
    );
}