import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAllContent } from '@/lib/content'
import { chunkText, simpleSearch } from '@/lib/rag'
import { checkRateLimit } from '@/lib/rate-limit'

const SYSTEM_PROMPT = `You are David Garzon's personal AI agent on his website davidgarzon.com. 
You answer questions about David's work, experience, product philosophy, and professional background.

Rules:
- Only answer based on the provided context. If the answer is not in the context, say "I don't have enough information about that specific topic. Feel free to reach out to David directly."
- Never invent confidential details, private names, specific metrics, or sensitive information.
- If asked about layoffs or workforce reductions, only discuss high-level leadership philosophy around team management.
- Refuse inappropriate personal questions politely.
- Be concise, professional, and helpful.
- Speak in first person as if you are David's representative, but make clear you are his AI agent.
- Keep answers to 2-4 paragraphs maximum.`

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
    const relevant = simpleSearch(lastUserMessage.content, chunks, 5)
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
