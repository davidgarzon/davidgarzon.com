'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Loader2, User, Bot } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestedQuestions = [
  'Most impactful project?',
  'What roles are you looking for?',
  'Industries you prefer?',
  'How do you run product discovery?',
  'How do you approach AI-native architecture?',
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length > 0 || loading) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  async function handleSubmit(question: string) {
    if (!question.trim() || loading) return

    const userMessage: Message = { role: 'user', content: question }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError('')

    trackEvent(ANALYTICS_EVENTS.AGENT_QUESTION_SUBMITTED, { question })

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get response')
      }
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full min-h-[400px] flex-col">
      <ScrollArea className="flex-1 pr-4">
        <div className="mx-auto max-w-3xl space-y-6 pt-4 pb-8">
          {messages.length === 0 && (
            <div className="pt-2 pb-10 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => {
                      trackEvent(ANALYTICS_EVENTS.AGENT_CHIP_CLICKED, { chip_text: q })
                      handleSubmit(q)
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <Bot size={14} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 bg-gray-50/80'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-gray-900">
                  <User size={14} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                <Bot size={14} />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 size={14} className="animate-spin" />
                Thinking...
              </div>
            </div>
          )}

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(input)
          }}
          className="mx-auto flex max-w-3xl gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work, experience, or product philosophy..."
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>
      </div>
    </div>
  )
}
