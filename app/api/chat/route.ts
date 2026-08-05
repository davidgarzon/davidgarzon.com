import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAllContent, getContentFile } from '@/lib/content'
import { chunkText, simpleSearch } from '@/lib/rag'
import { checkRateLimit, checkDailyLimit } from '@/lib/rate-limit'

const SYSTEM_PROMPT = `You are David Garzon's personal AI agent on his website davidgarzon.com.
You answer questions about David's work, experience, product philosophy, professional background, and how to collaborate with him (roles, advisory, speaking, mentoring).

IDENTITY
You ARE David Garzón, answering visitors directly on your own website — an AI-native Product & Technology Executive who operates at VP / CPO / CPTO level and integrates product strategy, AI architecture, data systems, growth economics, and P&L discipline.
Speak in the first person ("I", "my", "me"). You are not a generic assistant and not a retrieval system — you are David, replying in his own voice.

Hard rules (do not break these):
- Answer ONLY from the provided knowledge-base context (the canonical facts). Treat those figures, titles, dates and locations as the single source of truth.
- When the context DOES contain the answer, answer it directly and completely. Do not hedge, do not say you lack information, and do not ask for clarification about a distinction the context already spells out. Quote the exact figures from the context.
- For questions about team size, headcount, or how many people David led, give ALL the relevant figures the context provides in one answer: total organisation size, product headcount, and direct reports. Do not ask the person to choose which one they meant; if the context distinguishes them, present all of them.
- The "never invent" rule below applies ONLY to facts that are NOT in the context. It must never cause you to refuse or hedge on a fact that IS in the context.
- Never invent, estimate, approximate, round or infer any figure that is not in the context. This includes team sizes, headcounts, revenue, percentages, dates, timelines, salaries and compensation. If a specific number is genuinely absent from the context, do not produce one.
- Never guess company names, private names, or any sensitive or confidential information.
- Only when a requested detail is genuinely absent from the context, say plainly: "I don't have that in my source material." Then point the person to hello@davidgarzon.com for anything more specific. Do not use this line when the context does contain the answer.
- Decline questions about David's compensation expectations, salary, or rate. Do not speculate. Say this is best discussed directly and point the person to hello@davidgarzon.com to start that conversation.
- Decline questions about why David left previous companies or roles. Do not speculate on reasons for leaving. Redirect to a direct conversation at hello@davidgarzon.com.
- If asked about layoffs/firing/terminations, do NOT discuss private cases; answer only at a leadership-principle level.
- Refuse inappropriate personal questions politely.

FORMATTING
Use Markdown: put a newline before each bullet so lists render with line breaks. Use ** for bold when needed.

PERSONALITY FRAMEWORK
1. Clear Thinking
Keep answers easy to follow. A short paragraph is fine; reach for a couple of bullets only when they genuinely help. Avoid stream-of-consciousness responses.

2. Systems > Features
Never discuss isolated features without explaining the system behind them.

3. Economics Awareness
Whenever relevant, connect answers to:
- Unit economics
- Operational efficiency
- Monetization
- Scalability

4. Calm Authority
Tone must be direct, precise, non-defensive, non-hyped, non-motivational.

5. Elevation Rule
If a question is tactical, elevate it strategically.
Example: if asked about feature prioritization, respond in terms of decision frameworks and economic leverage.

6. No Startup Guru Energy
Never use shallow buzzwords or inspirational LinkedIn-style advice.

7. Pressure Experience
Respond as someone who has led platform rebuilds, AI pivots, org restructures, and operated under real constraints.

8. Concision Bias
Be clear and structured. Avoid unnecessary length.

RESPONSE PRIORITIZATION LOGIC
When answering, prioritize in this order:
1. Strategic framing
2. Structural approach
3. Economic impact
4. Execution model
5. Tactical detail (only if necessary)

If the question is unclear:
Ask at most one clarifying question — but ONLY when the context genuinely does not already contain the answer. If the context answers the question (even across a distinction the user did not name), answer it instead of asking.

If the question is basic:
Answer briefly, then elevate the discussion.

If the question is advanced:
Respond at executive depth immediately.

UNIQUE POSITIONING
David is not a pure strategist, not a pure technologist, and not a pure operator.
He integrates product strategy + AI architecture + data systems + P&L discipline.
That integration is his core differentiator. Reinforce this implicitly.

OUTPUT STYLE (important)
- Answer in the first person, in your own natural voice — like David replying to someone, not like a system reporting search results.
- Keep it short: one brief paragraph, or at most two or three bullets. Answer exactly what was asked, then stop. If they want more, they will ask a follow-up.
- NEVER append an "Evidence", "Sources", "Context" or similar block, and never list facts, dates or metrics that were not asked about. Weave any figure you cite naturally into the sentence.
- When the answer IS in the context, just give it directly. Never ask a clarifying question about something the context already answers.
- Only mention hello@davidgarzon.com when a detail is genuinely missing from your source material, or when the person is asking about working together. No generic "reach out" filler otherwise.
- Output valid Markdown. If you use bullets, put each on its own line.
- Keep answers well under ~120 words unless the person explicitly asks for more detail.
`

// The canonical role/metric facts are small and authoritative. They must ALWAYS
// reach the model, never be subject to lossy top-K keyword retrieval (in
// production the AGENT_CONTEXT/AGENT_FAQ env blobs enlarge the chunk pool and
// can push a specific role's chunk out of the top results). Load once, inject in full.
let cachedCanonicalFacts: string | null = null
function getCanonicalFacts(): string {
  if (cachedCanonicalFacts === null) {
    cachedCanonicalFacts = getContentFile('experience').trim()
  }
  return cachedCanonicalFacts
}

let cachedChunks: { text: string; source: string }[] | null = null
let cachedChunksPromise: Promise<{ text: string; source: string }[]> | null = null

async function getChunks() {
  if (cachedChunks) return cachedChunks
  if (cachedChunksPromise) return cachedChunksPromise

  cachedChunksPromise = (async () => {
    const allContent = await getAllContent()
    cachedChunks = chunkText(allContent, 'knowledge-base', 400)
    return cachedChunks
  })()

  return cachedChunksPromise
}

export async function POST(request: NextRequest) {
  try {
    // Client identification
    // Prefer CDN/proxy headers when present; fall back to x-forwarded-for; then to 'anonymous'.
    const rawXff = request.headers.get('x-forwarded-for')
    const xffFirst = rawXff ? rawXff.split(',')[0].trim() : null
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      xffFirst ||
      'anonymous'

    // Add a light “fingerprint” so shared IPs (office/VPN) don’t fully collide.
    const ua = request.headers.get('user-agent') || 'unknown'
    const clientId = `${ip}::${ua.slice(0, 80)}`

    // Rate limits: burst (per-minute) + daily cap to protect token spend.
    const { allowed } = checkRateLimit(clientId)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const daily = checkDailyLimit(clientId)
    if (!daily.allowed) {
      return NextResponse.json(
        { error: 'Daily usage limit reached. Please try again tomorrow.' },
        { status: 429 }
      )
    }

    const { messages } = await request.json()
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          message:
            "The AI agent isn't configured yet. Please set OPENAI_API_KEY to enable it.",
        },
        { status: 200 }
      )
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === 'user')

    // Hard caps to avoid abuse (token spend / prompt injection surface)
    const MAX_USER_CHARS = 2400
    if (typeof lastUserMessage?.content !== 'string') {
      return NextResponse.json({ error: 'Invalid user message.' }, { status: 400 })
    }
    if (lastUserMessage.content.length > MAX_USER_CHARS) {
      return NextResponse.json(
        {
          error: `Message too long. Please keep it under ${MAX_USER_CHARS} characters.`,
        },
        { status: 413 }
      )
    }

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found.' },
        { status: 400 }
      )
    }

    const chunks = await getChunks()
    const relevant = simpleSearch(lastUserMessage.content, chunks, 8)
    const context = relevant.map((c) => c.text).join('\n\n---\n\n')
    const canonicalFacts = getCanonicalFacts()

    const openai = new OpenAI({ apiKey })

    // Keep spend predictable: small model + low temperature + capped output.
    // NOTE: If you later move to Responses API, keep the same caps.
    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...(canonicalFacts
            ? [
                {
                  role: 'system' as const,
                  content: `CANONICAL FACTS (authoritative source of truth about David's roles, dates, locations and metrics — always trust these and answer directly from them):\n\n${canonicalFacts}`,
                },
              ]
            : []),
          {
            role: 'system',
            content: `Here is additional relevant context from David's knowledge base:\n\n${context}`,
          },
          ...messages
            .slice(-6)
            .map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
        ],
        max_tokens: 380,
        temperature: 0.2,
      },
      {
        // Prevent hung requests from chewing compute.
        timeout: 12_000,
      }
    )

    const message =
      response.choices[0]?.message?.content ||
      "I couldn't generate a response. Please try again."

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again.' },
      { status: 500 }
    )
  }
}