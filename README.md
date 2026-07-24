AI Chatbot

✓ ChatGPT-style interface
✓ Streaming responses
✓ Markdown support
✓ Code syntax highlighting
✓ Copy messages
✓ Auto scroll
✓ AI typing animation
✓ Responsive
✓ Dark mode
✓ Chat history (localStorage)
✓ Clear chat
✓ Mobile friendly
✓ Loading states
✓ Error handling
✓ Production ready

lib/
├── storage.ts
├── chat-history.ts
├── markdown.ts
├── prompts.ts
├── models.ts

hooks/
├── use-chat-history.ts
├── use-chat-search.ts

components/
├── chat/
│   ├── conversation-title.tsx
│   ├── message-actions.tsx
│   ├── regenerate-button.tsx
│   ├── stop-generating.tsx
│   ├── scroll-to-bottom.tsx
│   ├── suggested-prompts.tsx
│   └── welcome-screen.tsx

sidebar/
├── rename-dialog.tsx
├── delete-dialog.tsx

providers/
├── theme-provider.tsx

stores/
├── settings-store.ts

app/
├── settings/
│   └── page.tsx








components/
├── core/
│   ├── button.tsx
│   ├── card.tsx
│   ├── textarea.tsx
│   ├── badge.tsx
│   ├── spinner.tsx
│   ├── tooltip.tsx
│   └── divider.tsx
│
├── markdown/
│   ├── markdown.tsx
│   ├── code-block.tsx
│   ├── copy-button.tsx
│   ├── table.tsx
│   └── syntax-theme.ts
│
├── sidebar/
│   ├── search.tsx
│   ├── conversation-item.tsx
│   ├── profile.tsx
│   └── mobile-sidebar.tsx
│
├── effects/
│   ├── background-glow.tsx
│   ├── spotlight.tsx
│   └── grid.tsx
│
├── providers/
│   └── chat-provider.tsx
│
├── hooks/
│   ├── use-auto-scroll.ts
│   ├── use-local-storage.ts
│   └── use-mobile.ts
│
├── services/
│   └── chat.ts
│
└── stores/
└── chat-store.ts


app/
│
├── (chat)/
│   ├── layout.tsx
│   └── page.tsx
│
├── globals.css
└── layout.tsx

components/
│
├── chat/
│   ├── logo.tsx
│   ├── app-sidebar.tsx
│   ├── header.tsx
│   ├── empty-state.tsx
│   ├── suggestion-card.tsx
│   ├── chat-input.tsx
│   ├── message.tsx
│   └── typing.tsx
│
├── providers/
│   └── theme-provider.tsx
│
└── ui/

hooks/

lib/
│
├── mock-data.ts
├── constants.ts
└── utils.ts

types/

public/
│
├── logo.png
├── logo.svg
└── favicon.ico

lib/
├── storage.ts
├── chat-history.ts
├── markdown.ts
├── prompts.ts
├── models.ts

hooks/
├── use-chat-history.ts
├── use-chat-search.ts

components/
├── chat/
│   ├── conversation-title.tsx
│   ├── message-actions.tsx
│   ├── regenerate-button.tsx
│   ├── stop-generating.tsx
│   ├── scroll-to-bottom.tsx
│   ├── suggested-prompts.tsx
│   └── welcome-screen.tsx

sidebar/
├── rename-dialog.tsx
├── delete-dialog.tsx

providers/
├── theme-provider.tsx

stores/
├── settings-store.ts

app/
├── settings/
│   └── page.tsx







ai-chatbot/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   │
│   ├── chat/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── chat/
│   │   ├── Chat.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── MessageList.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   │
│   ├── ui/
│   └── ThemeToggle.tsx
│
├── hooks/
│   └── useAutoScroll.ts
│
├── lib/
│   ├── groq.ts
│   ├── markdown.ts
│   └── utils.ts
│
├── types/
│   └── chat.ts
│
├── public/
│
├── .env.local
│
├── package.json
│
└── README.md