'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Send, Loader2, Sparkles } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { motionConfig } from '@/lib/motion'

const suggestedQuestions = [
  'Most impactful project?',
  'What roles are you looking for?',
  'Industries you prefer?',
  'How do you run product discovery?',
  'How do you approach AI-native architecture?',
]

export function HomeAgent() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(question: string) {
    if (!question.trim()) return
    setLoading(true)
    setError('')
    setAnswer('')
    trackEvent(ANALYTICS_EVENTS.AGENT_QUESTION_SUBMITTED, { question })

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
      })
      if (!res.ok) throw new Error('Failed to get response')
      const data = await res.json()
      setAnswer(data.message)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="agent" className="py-32 px-6 border-t border-gray-100/50 relative overflow-hidden bg-white">
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="bg-white border border-gray-200/80 rounded-[2rem] p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-gray-900">Ask My Agent</h3>
          </div>

          <p className="text-lg text-gray-500 mb-8">
            Powered by my knowledge base. Ask anything about my work, experience, or approach.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuery(q)
                  trackEvent(ANALYTICS_EVENTS.AGENT_CHIP_CLICKED, { chip_text: q })
                  handleSubmit(q)
                }}
                className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-sm text-gray-600 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(query)
            }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gray-900/5 rounded-2xl blur group-focus-within:bg-gray-900/10 transition-colors" aria-hidden />
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:border-gray-300 focus-within:ring-4 focus-within:ring-gray-100 transition-all">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. What is your approach to AI-native architecture?"
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-base text-gray-900 placeholder:text-gray-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors ml-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Send className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </form>

          {loading && (
            <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
              Thinking...
            </p>
          )}

          {answer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-base text-gray-700 leading-relaxed"
            >
              {answer}
            </motion.div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 text-center">
            <Link
              href="/agent"
              className="inline-flex items-center text-base text-gray-500 hover:text-gray-900 transition-colors group"
            >
              Open full agent
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
