# davidgarzon.com

Personal website and AI-native product builder identity site for David Garzon. Built with Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion (subtle)
- **Analytics:** PostHog
- **AI Agent:** OpenAI GPT-4o-mini with in-memory RAG
- **Deployment:** Vercel-ready

## Getting Started

```bash
# Clone the repository
git clone https://github.com/davidgarzon/davidgarzon.com.git
cd davidgarzon.com

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with:

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key | No (analytics disabled without it) |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog instance host | No |
| `OPENAI_API_KEY` | OpenAI API key for the chat agent | No (agent shows fallback message) |

The site works fully without any environment variables. Analytics and the AI agent degrade gracefully when keys are not set.

## Private agent context (ENV)

To keep the agent’s private context out of a public repo, you can load it from environment variables instead of `content/` files:

1. **In Vercel:** set `AGENT_CONTEXT` and optionally `AGENT_FAQ` (long text). Set `AGENT_CONTEXT_MODE` to `env` to use only env, or `auto` (default) to use env when set and fall back to files otherwise.
2. **Do not commit private content:** remove or avoid committing `content/agent.md` and `content/faq.md` if they contain sensitive data (e.g. add them to `.gitignore` or move their content into Vercel env).
3. **Local dev:** if env vars are not set, `AGENT_CONTEXT_MODE=auto` will still read `content/agent.md` and `content/faq.md` from disk when present.

| Variable | Description |
|----------|-------------|
| `AGENT_CONTEXT_MODE` | `auto` (default), `env`, or `files` |
| `AGENT_CONTEXT` | Full agent context text (replaces `content/agent.md` when used) |
| `AGENT_FAQ` | FAQ text (replaces `content/faq.md` when used, optional) |

**To stop shipping private context in git:** delete or move `content/agent.md` and `content/faq.md` (or add them to `.gitignore`), then set the same content in Vercel as `AGENT_CONTEXT` and `AGENT_FAQ`. Public files `bio.md`, `principles.md`, `roles.md` and `content/projects/*.md` stay in the repo.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (Header, Footer, PostHog)
│   ├── work/               # Work listing + project detail pages
│   ├── skills/             # Skills capability grid
│   ├── about/              # About narrative + principles
│   ├── agent/              # Full-page chat experience
│   └── api/chat/           # Chat API route (OpenAI + RAG)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Footer, PageHeader
│   ├── sections/           # Home page sections
│   ├── agent/              # Chat component
│   └── providers/          # PostHog provider
├── content/                # Knowledge base (markdown)
│   ├── bio.md
│   ├── principles.md
│   ├── roles.md
│   ├── faq.md
│   └── projects/           # Individual project files
├── lib/                    # Utilities
│   ├── utils.ts            # cn() helper
│   ├── content.ts          # Markdown content loading
│   ├── rag.ts              # In-memory RAG (chunking + search)
│   ├── rate-limit.ts       # API rate limiting
│   ├── analytics.ts        # PostHog event tracking
│   └── projects-data.ts    # Client-side project data
└── public/                 # Static assets
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Pillars, Featured Projects, How I Work, Agent preview, Contact |
| `/work` | Project listing as premium cards |
| `/work/[slug]` | Project detail with rendered markdown |
| `/skills` | Capability grid with signals |
| `/about` | Narrative + AI-native company philosophy + principles |
| `/agent` | Full chat experience with conversation history |

## AI Agent

The agent at `/agent` uses a RAG (Retrieval-Augmented Generation) approach:

1. **Content Loading:** All markdown files from `/content/` are loaded at startup
2. **Chunking:** Content is split into ~400-character chunks
3. **Retrieval:** User queries are matched against chunks using term-frequency search
4. **Generation:** Top-5 relevant chunks are passed as context to OpenAI GPT-4o-mini
5. **Guardrails:** System prompt enforces boundaries (no invented info, no sensitive details)

The agent includes:
- Rate limiting (20 requests/minute per IP)
- Conversation memory (last 6 messages)
- Graceful fallback when API key is not configured
- Suggested question chips

## Analytics (PostHog)

Tracked events:
- `click_explore_work` — CTA click on hero
- `click_ask_agent` — CTA click on hero
- `project_card_click` — Project card interaction
- `agent_question_submitted` — Agent query sent
- `suggested_chip_clicked` — Suggested question chip used
- Page views and session duration (automatic)

## Deployment

Deploy directly to Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

```bash
npm run build   # Verify production build locally
```

## Development

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## License

Private. All rights reserved.
