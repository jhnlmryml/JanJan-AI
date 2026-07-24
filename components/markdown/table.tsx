"use client";

import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLTableElement>;

export function Table({
                          className,
                          ...props
                      }: Props) {
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-white/10">
            <table
                className={cn(
                    "w-full border-collapse text-left text-sm",
                    className
                )}
                {...props}
            />
        </div>
    );
}

export function TableHeader({
                                className,
                                ...props
                            }: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead
            className={cn(
                "border-b border-white/10 bg-white/[0.03]",
                className
            )}
            {...props}
        />
    );
}

export function TableBody({
                              className,
                              ...props
                          }: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody
            className={cn(className)}
            {...props}
        />
    );
}

export function TableRow({
                             className,
                             ...props
                         }: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            className={cn(
                "border-b border-white/5 transition-colors hover:bg-white/[0.025]",
                className
            )}
            {...props}
        />
    );
}

export function TableHead({
                              className,
                              ...props
                          }: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className={cn(
                "px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400",
                className
            )}
            {...props}
        />
    );
}

export function TableCell({
                              className,
                              ...props
                          }: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td
            className={cn(
                "px-5 py-4 align-top text-zinc-200",
                className
            )}
            {...props}
        />
    );
}