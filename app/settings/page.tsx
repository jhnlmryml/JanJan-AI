"use client";

import { Moon, Sun, Monitor, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";

import { APP } from "@/config/site";
import { getEnabledModels } from "@/lib/models";
import { useSettingsStore } from "@/stores/settings-store";

export default function SettingsPage() {
    const { setTheme } = useTheme();

    const {
        theme,
        model,
        sendWithEnter,
        showLineNumbers,
        wordWrap,
        markdown,
        animations,
        compactMode,
        setModel,
        setTheme: setThemeStore,
        setSendWithEnter,
        setShowLineNumbers,
        setWordWrap,
        setMarkdown,
        setAnimations,
        setCompactMode,
        reset,
    } = useSettingsStore();

    function changeTheme(value: "dark" | "light" | "system") {
        setTheme(value);
        setThemeStore(value);
    }

    return (
        <main className="min-h-screen bg-background text-primary">
            <div className="container-chat py-12">

                <h1 className="text-4xl font-bold tracking-tight">
                    Settings
                </h1>

                <p className="mt-2 text-secondary">
                    Customize your {APP.name} experience.
                </p>

                {/* Appearance */}

                <section className="card-surface mt-10 rounded-3xl p-8">

                    <h2 className="text-xl font-semibold">
                        Appearance
                    </h2>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <ThemeButton
                            active={theme === "light"}
                            icon={<Sun size={18} />}
                            title="Light"
                            onClick={() => changeTheme("light")}
                        />

                        <ThemeButton
                            active={theme === "dark"}
                            icon={<Moon size={18} />}
                            title="Dark"
                            onClick={() => changeTheme("dark")}
                        />

                        <ThemeButton
                            active={theme === "system"}
                            icon={<Monitor size={18} />}
                            title="System"
                            onClick={() => changeTheme("system")}
                        />

                    </div>

                </section>

                {/* AI Model */}

                <section className="card-surface mt-8 rounded-3xl p-8">

                    <h2 className="text-xl font-semibold">
                        AI Model
                    </h2>

                    <select
                        value={model}
                        onChange={(e) =>
                            setModel(e.target.value)
                        }
                        className="
              mt-6
              h-12
              w-full
              rounded-2xl
              border
              border-border
              bg-surface
              px-4
            "
                    >
                        {getEnabledModels().map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>

                </section>

                {/* Preferences */}

                <section className="card-surface mt-8 rounded-3xl p-8">

                    <h2 className="text-xl font-semibold">
                        Preferences
                    </h2>

                    <div className="mt-8 space-y-5">

                        <Switch
                            label="Send with Enter"
                            checked={sendWithEnter}
                            onChange={setSendWithEnter}
                        />

                        <Switch
                            label="Markdown"
                            checked={markdown}
                            onChange={setMarkdown}
                        />

                        <Switch
                            label="Word Wrap"
                            checked={wordWrap}
                            onChange={setWordWrap}
                        />

                        <Switch
                            label="Show Line Numbers"
                            checked={showLineNumbers}
                            onChange={setShowLineNumbers}
                        />

                        <Switch
                            label="Animations"
                            checked={animations}
                            onChange={setAnimations}
                        />

                        <Switch
                            label="Compact Mode"
                            checked={compactMode}
                            onChange={setCompactMode}
                        />

                    </div>

                </section>

                {/* Reset */}

                <div className="mt-8 flex justify-end">

                    <button
                        onClick={reset}
                        className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-red-600
              px-5
              py-3
              text-white
              transition
              hover:bg-red-500
            "
                    >
                        <RotateCcw size={16} />

                        Reset Settings
                    </button>

                </div>

            </div>
        </main>
    );
}

function ThemeButton({
                         active,
                         icon,
                         title,
                         onClick,
                     }: {
    active: boolean;
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
        flex
        items-center
        gap-3
        rounded-2xl
        border
        px-5
        py-3
        transition

        ${
                active
                    ? "border-blue-500 bg-blue-500/10 text-blue-300"
                    : "border-border hover:bg-white/5"
            }
      `}
        >
            {icon}
            {title}
        </button>
    );
}

function Switch({
                    label,
                    checked,
                    onChange,
                }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between">

            <span>{label}</span>

            <button
                onClick={() => onChange(!checked)}
                className={`
          relative
          h-7
          w-12
          rounded-full
          transition

          ${checked ? "bg-blue-600" : "bg-zinc-700"}
        `}
            >
        <span
            className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            transition

            ${checked ? "left-6" : "left-1"}
          `}
        />
            </button>

        </label>
    );
}