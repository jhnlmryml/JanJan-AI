"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import { APP } from "@/config/site";

export default function EmptyState() {
    return (
        <section className="relative flex flex-1 items-center justify-center px-4 py-6 sm:px-6">
            <div className="fade-up flex w-full max-w-lg flex-col items-center text-center">

                {/* Status Badge */}
                <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-[11px] font-medium text-blue-400 backdrop-blur-md sm:mb-7 sm:text-xs">
                    <Sparkles className="h-3 w-3 animate-pulse text-blue-400 sm:h-3.5 sm:w-3.5" />
                    <span>{APP.tagline}</span>
                </div>

                {/* Enlarged Logo Frame with Rotating Border */}
                <div className="group relative mb-6 flex h-36 w-36 items-center justify-center rounded-3xl p-[2px] sm:h-48 sm:w-48 sm:rounded-[36px] overflow-hidden">
                    {/* Rotating Conic Light Layer */}
                    <div
                        aria-hidden="true"
                        className="absolute -inset-[100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#00f0ff_280deg,#3b82f6_330deg,transparent_360deg)] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Inner Glass Frame */}
                    <div className="glass-panel relative flex h-full w-full items-center justify-center rounded-[22px] p-4 sm:rounded-[34px] sm:p-5 bg-[#0a0a0f]/80">
                        <Image
                            src={APP.logo}
                            alt={`${APP.name} logo`}
                            height={180}
                            width={180}
                            preload
                            className="h-auto w-full max-w-[92%] drop-shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
                    Hi, I&#39;m <span className="bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">{APP.name}</span>
                </h1>

                {/* Description */}
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm max-sm:px-4">
                    {APP.description}
                </p>

            </div>
        </section>
    );
}