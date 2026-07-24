"use client";

import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import type { ChatStatus } from "ai";

import { Button } from "@/components/core/button";
import { Card } from "@/components/core/card";
import { ChatTextarea } from "@/components/core/textarea";

type ChatInputProps = {
    status: ChatStatus;
    sendMessage: (message: { text: string }) => void;
};

export default function ChatInput({
                                      status,
                                      sendMessage,
                                  }: ChatInputProps) {
    const [input, setInput] = useState("");

    const disabled =
        status !== "ready" || input.trim().length === 0;

    function submit() {
        const text = input.trim();

        if (!text) return;

        sendMessage({
            text,
        });

        setInput("");
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!disabled) {
            submit();
        }
    }

    return (
        <footer className="border-t border-border px-6 py-6">
            <form
                onSubmit={handleSubmit}
                className="container-chat"
            >
                <Card
                    className="
            input-shell
            glow
            rounded-[28px]
            p-4
          "
                >
                    <div className="flex items-end gap-3">

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="
                icon-button
                shrink-0
                rounded-2xl
                text-secondary
                hover:text-primary
              "
                        >
                            <Paperclip className="size-5" />
                        </Button>

                        <ChatTextarea
                            value={input}
                            rows={1}
                            disabled={status !== "ready"}
                            placeholder="Message Janjan..."
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {
                                    e.preventDefault();

                                    if (!disabled) {
                                        submit();
                                    }
                                }
                            }}
                            className="
                max-h-52
                flex-1
                overflow-y-auto
                text-[15px]
                leading-7
              "
                        />

                        <Button
                            type="submit"
                            size="icon"
                            disabled={disabled}
                            className="
                icon-button
                shrink-0
                rounded-2xl
                bg-accent
                text-white
                hover:bg-accent-hover
                disabled:bg-zinc-800
                disabled:text-zinc-500
              "
                        >
                            <ArrowUp className="size-5" />
                        </Button>

                    </div>
                </Card>
            </form>
        </footer>
    );
}