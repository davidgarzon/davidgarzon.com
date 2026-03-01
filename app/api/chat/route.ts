import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAllContent } from '@/lib/content'
import { chunkText, simpleSearch } from '@/lib/rag'
import { checkRateLimit } from '@/lib/rate-limit'

const SYSTEM_PROMPT = `You are David Garzon's personal AI agent on his website davidgarzon.com.
You answer questions about David's work, experience, product philosophy, professional background, and how to collaborate with him (roles, advisory, speaking, mentoring).

Hard rules (do not break these):
- Use ONLY the provided knowledge-base context. If a detail is not present, say: "I don't have enough information to answer that precisely." Then offer a safe alternative (ask a follow-up question OR suggest contacting David).
- Never guess numbers, company names, timelines, private names, compensation, or any sensitive/confidential information.
- Do not invent accomplishments. If asked for metrics or scale and they are not in context, say you don't know.
- If asked about layoffs/firing/terminations, do NOT discuss private cases; answer at a high level about leadership principles and responsible team management.
- Refuse inappropriate personal questions politely.

Response style:
- Be concise, sharp, and executive. Prefer bullet points.
- Default structure for most answers:
  1) Direct answer (1–3 bullets)
  2) Evidence from context (1–3 bullets)
  3) Optional next step / how to contact (1 short line)
- If the user asks about "impact" or "results", always separate:
  - Impact (numbers/outcomes)
  - What David did (systems/actions)
- Speak in first person as David’s representative, but be explicit that you are his AI agent.
- If the user asks about working with David (roles/advisory), end with a clear CTA including email and LinkedIn when available in context.
- Keep responses under ~180 words unless the user explicitly asks for more detail.
`

let cachedChunks: { text: string; source: string }[] | null = null

function getChunks() {
  if (cachedChunks) return cachedChunks
  const allContent = getAllContent()
  cachedChunks = chunkText(allContent, 'knowledge-base', 400)
  return cachedChunks
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const { allowed } = checkRateLimit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
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
            'The AI agent is not configured yet. Please set the OPENAI_API_KEY environment variable to enable this feature. In the meantime, feel free to explore the rest of the site!',
        },
        { status: 200 }
      )
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m: { role: string }) => m.role === 'user')
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: 'No user message found.' },
        { status: 400 }
      )
    }

    const chunks = getChunks()
    const relevant = simpleSearch(lastUserMessage.content, chunks, 8)
    const context = relevant.map((c) => c.text).join('\n\n---\n\n')

    const openai = new OpenAI({ apiKey })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'system',
          content: `Here is the relevant context from David's knowledge base:\n\n${context}`,
        },
        ...messages.slice(-6).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

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
