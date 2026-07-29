"use client";

import React from "react";
import { Cpu, Settings, Zap } from "lucide-react";
import { APP } from "@/config/site";

export default function SidebarFooter({
                                          isCollapsed,
                                      }: {
    isCollapsed: boolean;
}) {
    return (
        <div className="shrink-0 overflow-hidden border-t border-white/[0.08] bg-white/[0.01] p-3">
            {!isCollapsed ? (
                <div className="min-w-0 space-y-3">
                    {/* AI Model Card */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all hover:bg-white/[0.05]">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
                                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                        AI Model
                                    </span>

                                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                        Online
                                    </span>
                                </div>

                                <p className="mt-0.5 truncate text-[11px] font-medium text-slate-200">
                                    {APP.model}
                                </p>
                            </div>
                        </div>

                        {/* Provider */}
                        <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2">
                            <span className="text-[10px] text-slate-500">
                                Powered by
                            </span>

                            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                <Zap className="h-2.5 w-2.5 text-amber-400" />
                                {APP.provider}
                            </span>
                        </div>
                    </div>

                    {/* Operational Status & Settings */}
                    <div className="flex items-center justify-between px-1">
                        <div className="flex min-w-0 items-center gap-2">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>

                            <span className="truncate text-[11px] font-medium text-slate-400">
                                Operational
                            </span>
                        </div>

                        <button
                            type="button"
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                            title="Settings"
                        >
                            <Settings className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            ) : (
                /* Collapsed Footer */
                <div className="flex w-full flex-col items-center justify-center gap-3 py-1">
                    {/* Status */}
                    <div className="group relative flex items-center justify-center">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>

                        <div className="pointer-events-none absolute left-16 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#0d1322] px-2.5 py-1.5 text-[11px] text-slate-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                            {APP.model}
                            <span className="mx-1 text-slate-600">•</span>
                            {APP.provider}
                            <span className="mx-1 text-slate-600">•</span>
                            Online
                        </div>
                    </div>

                    {/* Settings */}
                    <button
                        type="button"
                        className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                        title="Settings"
                    >
                        <Settings className="h-4 w-4" />

                        <div className="pointer-events-none absolute left-16 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#0d1322] px-2.5 py-1.5 text-[11px] text-slate-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                            Settings
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}










// "use client";
//
// import React from "react";
// import { Cpu, Settings, Zap } from "lucide-react";
// import { APP } from "@/config/site";
//
// export default function SidebarFooter({ isCollapsed }: { isCollapsed: boolean }) {
//     const usedTokens = 74200;
//     const totalTokens = 100000;
//     const usagePercentage = Math.round((usedTokens / totalTokens) * 100);
//
//     return (
//         <div className="border-t border-white/[0.08] p-3 shrink-0 bg-white/[0.01] overflow-hidden">
//             {!isCollapsed ? (
//                 <div className="space-y-3 min-w-0">
//                     {/* Token Usage Card */}
//                     <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all hover:bg-white/[0.05]">
//                         <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
//                             <span className="flex items-center gap-1.5 text-slate-400 truncate">
//                                 <Cpu className="h-3.5 w-3.5 text-blue-400 shrink-0" />
//                                 <span className="truncate">{APP.model}</span>
//                             </span>
//                             <span className="font-semibold text-blue-400 shrink-0 ml-1">
//                                 {usagePercentage}%
//                             </span>
//                         </div>
//
//                         {/* Usage Progress Bar */}
//                         <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
//                             <div
//                                 className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
//                                 style={{ width: `${usagePercentage}%` }}
//                             />
//                         </div>
//
//                         <div className="mt-1.5 flex justify-between text-[10px] text-slate-400 font-mono">
//                             <span>{(usedTokens / 1000).toFixed(1)}k used</span>
//                             <span className="flex items-center gap-1 text-emerald-400">
//                                 <Zap className="h-2.5 w-2.5" /> {APP.provider}
//                             </span>
//                         </div>
//                     </div>
//
//                     {/* Operational Status & Settings */}
//                     <div className="flex items-center justify-between px-1">
//                         <div className="flex items-center gap-2 min-w-0">
//                             <span className="relative flex h-2 w-2 shrink-0">
//                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
//                             </span>
//                             <span className="text-[11px] font-medium text-slate-400 truncate">
//                                 Operational
//                             </span>
//                         </div>
//
//                         <button
//                             type="button"
//                             className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
//                             title="Settings"
//                         >
//                             <Settings className="h-3.5 w-3.5" />
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 /* Collapsed Footer Mode: Centered Icons */
//                 <div className="flex flex-col items-center gap-3 py-1 w-full justify-center">
//                     <div className="group relative flex items-center justify-center">
//                         <span className="relative flex h-2.5 w-2.5">
//                             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                             <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
//                         </span>
//                         <div className="absolute left-16 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#0d1322] px-2.5 py-1 text-[11px] text-slate-200 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
//                             {APP.model} ({APP.provider}) • {usagePercentage}%
//                         </div>
//                     </div>
//
//                     <button
//                         type="button"
//                         className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
//                     >
//                         <Settings className="h-4 w-4" />
//                         <div className="absolute left-16 z-50 whitespace-nowrap rounded-lg border border-white/10 bg-[#0d1322] px-2.5 py-1 text-[11px] text-slate-200 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
//                             Settings
//                         </div>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }