'use client'

import Link from 'next/link'
import { Mail, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const links = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@davidgarzon.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/davidgarzon', external: true },
  { icon: Github, label: 'GitHub', href: 'https://github.com/davidgarzon', external: true },
]

export function Contact() {
  return (
    <section className="py-32 px-6 border-t border-gray-100 bg-[#FAFAFA]">
      <motion.div
        initial={motionConfig.section.initial}
        whileInView={motionConfig.section.whileInView}
        viewport={motionConfig.section.viewport}
        transition={motionConfig.section.transition}
        className="max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">Let&apos;s Build Serious Things</h2>
        <p className="text-lg text-gray-500 max-w-2xl mb-10">
          If you&apos;re building an AI-native product, scaling a product org, or need senior product judgment — let&apos;s talk.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Link
            href="mailto:hello@davidgarzon.com"
            className="inline-flex items-center text-gray-900 text-base font-medium border-b-2 border-gray-900 pb-0.5 hover:border-gray-500 transition-colors"
          >
            Schedule a conversation
          </Link>
          <Link
            href="/agent"
            className="inline-flex items-center text-gray-600 text-base font-medium border-b border-gray-300 pb-0.5 hover:text-gray-900 hover:border-gray-500 transition-colors"
          >
            Ask the Agent about my experience
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-base text-gray-500 hover:text-gray-900 transition-colors px-4 py-2 rounded-xl hover:bg-gray-50"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {link.label}
              </Link>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
