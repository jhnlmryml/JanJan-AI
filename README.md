# 🤖 Janjan AI — Modern Next.js Chatbot

A high-performance, cinematic AI chat interface built with **Next.js, Vercel AI SDK, Groq, and Tailwind CSS**.

Janjan AI is designed with a modern glassmorphism aesthetic and focuses on fast AI streaming, responsive mobile experiences, persistent conversations, accessibility, and a polished user experience.

## ✨ Key Features

### ⚡ Blazing-Fast AI Streaming

Powered by Groq's `llama-3.3-70b-versatile` model through the Vercel AI SDK for ultra-low-latency response streaming.

### 🎨 Cinematic Glassmorphism UI

A premium dark-mode interface featuring:

* Ambient lighting effects
* Glassmorphism surfaces
* Smooth entrance animations
* Subtle backdrops
* Crisp visual contrast
* Modern responsive layouts

### 💾 LocalStorage Chat Persistence

Client-side conversation history with:

* Persistent chat sessions
* Automatic conversation titles based on context
* Chronological history grouping
* Today
* Yesterday
* Last 7 Days
* Older conversations
* Hydration-safe state management

### 📱 Touch-Optimized & Mobile-First

Designed to provide a native-app-like experience across desktop and mobile devices.

Includes:

* Dynamic viewport height 
* iOS safe-area support 
* Hidden scrollbars
* Touch-friendly interaction targets
* Responsive mobile-first layouts
* Optimized keyboard and viewport behavior

### 💡 Interactive Suggestion Pills

High-value prompt suggestions are positioned directly above the chat input.

Features include:

* One-click prompt submission
* Smart auto-hide while typing
* Responsive positioning
* Context-friendly suggestions

### 📝 Code Highlighting & Markdown

Rich AI response rendering powered by:

* `react-markdown`
* `remark-gfm`
* `react-syntax-highlighter`

Includes syntax-highlighted code blocks with one-click code copying and visual feedback.

### ⌨️ Shortcuts & Accessibility

Keyboard-friendly navigation and accessible interactive components with ARIA support.

| Shortcut             | Action                        |
| -------------------- | ----------------------------- |
| `⌘ + K` / `Ctrl + K` | Focus search bar in sidebar   |
| `⌘ + B` / `Ctrl + B` | Toggle sidebar collapse state |
| `⌘ + N` / `Ctrl + N` | Start a new chat session      |
| `Enter`              | Send message                  |
| `Shift + Enter`      | Insert newline in chat input  |
| `Escape`             | Cancel inline title editing   |

## 🛠️ Tech Stack

| Category            | Technology                                  |
| ------------------- | ------------------------------------------- |
| Framework           | Next.js 16, App Router, React 19, Turbopack |
| Styling             | Tailwind CSS, Custom Glassmorphism Effects  |
| AI Engine           | Vercel AI SDK, `@ai-sdk/groq`, Groq         |
| AI Model            | `llama-3.3-70b-versatile`                   |
| Icons               | Lucide React                                |
| UI Utilities        | Radix UI Slot                               |
| Validation          | Zod                                         |
| Markdown            | React Markdown                              |
| Markdown Extensions | remark-gfm                                  |
| Code Highlighting   | react-syntax-highlighter                    |

## ⚙️ Configuration & Customization


### System Prompt & Identity

Centralized AI instructions define:

* Assistant identity
* Persona guidelines
* Conversation behavior
* System limitations
* Output formatting boundaries

### Model Parameters

Centralized model settings control:

* Temperature
* Context message limits
* Token input limits
* Conversation rules
* AI model configuration

## 📱 Responsive Experience

The interface is designed and optimized for:

* Desktop
* Laptop
* Tablet
* Android devices
* iOS devices
* Mobile browsers

Special attention was given to mobile viewport behavior, safe-area insets, touch interactions, scrolling, and keyboard behavior.

## 🔒 Privacy

Chat history is stored locally in the user's browser using `localStorage`.

No user account or authentication is required to use the application.

## 📄 License

Copyright (c) 2026 Jhon. All rights reserved.

This repository is provided for viewing and reference purposes only.

You may view the source code for educational and reference purposes. You may not copy, reproduce, modify, distribute, sublicense, publish, or reuse any portion of this code for personal, commercial, or redistributable projects without prior written permission from the copyright owner.
