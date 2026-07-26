"use client";

import { memo } from "react";

type UserMessageProps = {
    content: string;
};

function UserMessage({ content }: UserMessageProps) {
    return (
        <div className="fade-up flex justify-end">
            <div className="flex max-w-[85%] sm:max-w-[75%] items-end gap-3">
                <article className="message-user rounded-2xl rounded-br-md px-4.5 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-[15px] font-normal leading-relaxed text-white shadow-lg shadow-blue-600/20 break-words">
                    {content}
                </article>
            </div>
        </div>
    );
}

export default memo(UserMessage);