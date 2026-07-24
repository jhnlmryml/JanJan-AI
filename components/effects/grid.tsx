"use client";

export default function Grid() {
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
            {/* Main Grid */}

            <div
                className="
          absolute
          inset-0
          opacity-[0.045]
        "
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
                    backgroundSize: "42px 42px",
                }}
            />

            {/* Fade */}

            <div
                className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,#09090B_90%)]
        "
            />

            {/* Top Glow */}

            <div
                className="
          absolute
          inset-x-0
          top-0
          h-64
          bg-gradient-to-b
          from-blue-500/[0.05]
          via-transparent
          to-transparent
        "
            />

            {/* Bottom Glow */}

            <div
                className="
          absolute
          inset-x-0
          bottom-0
          h-72
          bg-gradient-to-t
          from-blue-500/[0.04]
          via-transparent
          to-transparent
        "
            />
        </div>
    );
}