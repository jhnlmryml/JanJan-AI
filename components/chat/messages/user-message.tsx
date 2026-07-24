"use client";

import { User } from "lucide-react";

type UserMessageProps = {
    content: string;
};

export default function UserMessage({
                                        content,
                                    }: UserMessageProps) {
    return (
        <div className="fade-up flex justify-end">
            <div className="flex max-w-4xl items-end gap-4">

                <article
                    className="
            message-user
            rounded-[28px]
            px-6
            py-5
            text-[15px]
            leading-7
            text-white
            shadow-lg
        "
                >
                    {content}
                </article>

                <div
                    className="
            glass
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
        "
                >
                    <User
                        size={18}
                        className="text-white"
                    />
                </div>

            </div>
        </div>
    );
}