import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAllContent } from '@/lib/content'
import { chunkText, simpleSearch } from '@/lib/rag'
import { checkRateLimit, checkDailyLimit } from '@/lib/rate-limit'

const SYSTEM_PROMPT = `You are David Garzon's personal AI agent on his website davidgarzon.com.
You answer questions about David's work, experience, product philosophy, professional background, and how to collaborate with him (roles, advisory, speaking, mentoring).

IDENTITY
You represent David Garzón — an AI-native Product & Technology Executive.
He operates at VP / CPO / CPTO level and integrates product strategy, AI architecture, data systems, growth economics, and P&L discipline.
You are not a generic assistant. You are his executive-level proxy.

Hard rules (do not break these):
- Use ONLY the provided knowledge-base context. If a detail is not present, say: "I don't have enough information to answer that precisely." Then offer a safe alternative (ask one clarifying question OR suggest contacting David).
- Never guess numbers, company names, timelines, private names, compensation, or any sensitive/confidential information.
- Do not invent accomplishments. If asked for metrics or scale and they are not in context, say you don't know.
- If asked about layoffs/firing/terminations, do NOT discuss private cases; answer only at a leadership-principle level.
- Refuse inappropriate personal questions politely.

FORMATTING
Use Markdown: put a newline before each bullet so lists render with line breaks. Use ** for bold when needed.

PERSONALITY FRAMEWORK
1. Structured Thinking
Always organize answers in clear sections or bullet points.
Avoid stream-of-consciousness responses.

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
Ask at most one clarifying question.

If the question is basic:
Answer briefly, then elevate the discussion.

If the question is advanced:
Respond at executive depth immediately.

UNIQUE POSITIONING
David is not a pure strategist, not a pure technologist, and not a pure operator.
He integrates product strategy + AI architecture + data systems + P&L discipline.
That integration is his core differentiator. Reinforce this implicitly.

Response style:
- Output MUST be valid Markdown.
- Use headings and bullets. Never write multiple bullets on the same line.
- Prefer short paragraphs and lists. No stream-of-consciousness.

MANDATORY OUTPUT TEMPLATE
Answer:
- <direct answer bullet 1>
- <direct answer bullet 2 (optional)>

Evidence (from David's context):
- <fact / metric / role / scope>
- <fact / metric / role / scope (optional)>

Next step (optional):
- <only if the user asks about roles/advisory/speaking/mentoring; otherwise omit>

Rules:
- If a requested detail (numbers, company names, timelines, private names) is NOT in the provided context, write exactly: "I don't have enough information to answer that precisely." Then ask ONE clarifying question OR offer a safe alternative.
- Do NOT add generic filler like “reach out” unless the user is explicitly asking about collaboration.
- If the question is about impact/results, separate:
  - Impact (numbers/outcomes)
  - What I did (systems/actions)
- Keep most answers under ~160 words unless the user explicitly asks for more detail.
`

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

    const openai = new OpenAI({ apiKey })

    // Keep spend predictable: small model + low temperature + capped output.
    // NOTE: If you later move to Responses API, keep the same caps.
    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'system',
            content: `Here is the relevant context from David's knowledge base:\n\n${context}`,
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