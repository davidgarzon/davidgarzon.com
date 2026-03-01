'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 leading-[1.1]">
            AI-Native Product & Technology Executive
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-3">
            I turn product, technology and AI into scalable operating systems that drive real business leverage.
          </p>
          <p className="text-xs font-medium tracking-wider text-gray-500 uppercase mb-1">
            Founder mindset. Executive discipline. Systems thinking.
          </p>
          <p className="text-[11px] text-gray-400 mb-8">
            Built at scale. Rebuilt when necessary.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
            <Link
              href="mailto:hello@davidgarzon.com"
              onClick={() => trackEvent(ANALYTICS_EVENTS.EXPLORE_WORK_CLICKED)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white text-base font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Start a conversation
            </Link>
            <Link
              href="/experience"
              onClick={() => trackEvent(ANALYTICS_EVENTS.EXPLORE_WORK_CLICKED)}
              className="inline-flex items-center text-gray-600 text-base font-medium hover:text-gray-900 transition-colors group"
            >
              View Executive Experience
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            50M+ users · 17 countries · 96-person org footprint · {'<4%'} churn · +60% efficiency
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative shrink-0 w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto lg:mx-0"
        >
          <div className="absolute inset-0 rounded-full overflow-hidden ring-2 ring-gray-100 ring-offset-4 ring-offset-white shadow-lg">
            <Image
              src="/portrait.png"
              alt="David Garzón"
              fill
              sizes="(max-width: 768px) 256px, 288px"
              className="object-cover object-[center_10%]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
