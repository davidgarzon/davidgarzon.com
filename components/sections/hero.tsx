'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="pt-28 pb-28 md:pt-36 md:pb-40 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center space-x-2 mb-10 border border-gray-200/60 bg-white/50 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-500" />
          </span>
          <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            VP Product · Head of Product · Product Leader
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.05]">
          AI-Native Product Builder
        </h1>

        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl mx-auto">
          I design decision systems and AI-native products where intelligence
          drives execution and measurable impact.
          <span className="block mt-2 text-gray-400">Barcelona</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/work"
            onClick={() => trackEvent(ANALYTICS_EVENTS.EXPLORE_WORK_CLICKED)}
            className="inline-flex items-center text-gray-900 text-base font-medium border-b-2 border-gray-900 pb-0.5 hover:border-gray-500 transition-colors"
          >
            Explore Work
            <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={1.5} />
          </Link>
          <Link
            href="/agent"
            onClick={() => trackEvent(ANALYTICS_EVENTS.ASK_AGENT_CLICKED)}
            className="inline-flex items-center text-gray-600 text-base font-medium border-b border-gray-300 pb-0.5 hover:text-gray-900 hover:border-gray-500 transition-colors group"
          >
            <MessageSquare className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
            Ask the Agent
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
