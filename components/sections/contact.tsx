'use client'

import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

export function Contact() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-white">
      <motion.div
        initial={motionConfig.section.initial}
        whileInView={motionConfig.section.whileInView}
        viewport={motionConfig.section.viewport}
        transition={motionConfig.section.transition}
        className="max-w-[1200px] mx-auto flex flex-col items-center text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-4">
          If you&apos;re building something complex, let&apos;s talk.
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mb-4">
          Scaling SaaS. AI transformation. Platform rebuild. Executive product leadership.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Link
            href="mailto:hello@davidgarzon.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white text-base font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Schedule a conversation
          </Link>
          <Link
            href="https://linkedin.com/in/davidgarzon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 text-base font-medium hover:text-gray-900 transition-colors group"
          >
            <Linkedin className="w-5 h-5 mr-1.5" strokeWidth={1.5} />
            LinkedIn
          </Link>
        </div>
        <a
          href="mailto:hello@davidgarzon.com"
          className="inline-flex items-center gap-2 text-base text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Mail className="w-4 h-4" strokeWidth={1.5} />
          hello@davidgarzon.com
        </a>
      </motion.div>
    </section>
  )
}
