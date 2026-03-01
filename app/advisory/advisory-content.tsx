'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { motionConfig } from '@/lib/motion'

const sections = [
  {
    title: 'AI Transformation',
    intro:
      'AI is not layered as a trend feature. It is embedded architecturally to multiply productivity, automate decision flows, and structurally improve operational leverage.',
    items: [
      'AI-first product strategy embedded at system level',
      'Multi-agent and decision system design',
      'Automation for productivity multiplication',
      'Platform architecture for AI-native scale',
    ],
  },
  {
    title: 'Product & Tech Operating Model',
    items: [
      'Product org redesign',
      'Tech stack consolidation',
      'Decision frameworks and execution cadence',
      'Search visibility systems (SEO + AEO for AI-native discovery)',
    ],
  },
  {
    title: 'Platform Rebuild',
    items: [
      'Platform architecture review',
      'Tech stack migration',
      'Monetization and unit economics alignment',
      'Scalable platform design',
    ],
  },
  {
    title: 'Executive Mentoring',
    items: [
      'Product leadership development',
      'AI-native product systems',
      'Executive workshops',
      'Former Lecturer at ISDI (2 years)',
    ],
  },
  {
    title: 'Board-Level Product Strategy',
    items: [
      'Investment-readiness review',
      'PRD and roadmap critique',
      'Executive and board alignment',
      'P&L and monetization structuring',
    ],
  },
]

export function AdvisoryContent() {
  return (
    <>
      <motion.div
        {...motionConfig.section}
        transition={motionConfig.section.transition}
        className="mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
          Advisory & Fractional Leadership
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-8">
          I work with CEOs and Boards navigating structural product, AI and platform transformation. As a Fractional CPO / CPTO, I focus on embedding intelligence into systems, aligning product with financial discipline, and redesigning organizations for sustainable scale.
        </p>
      </motion.div>

      <div className="space-y-16">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={motionConfig.section.initial}
            whileInView={motionConfig.section.whileInView}
            viewport={motionConfig.section.viewport}
            transition={{ ...motionConfig.section.transition, delay: i * 0.06 }}
          >
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6">
              {section.title}
            </h2>
            {'intro' in section && section.intro && (
              <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-2xl">
                {section.intro}
              </p>
            )}
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-600">
                  <span className="text-gray-400 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={motionConfig.section.initial}
        whileInView={motionConfig.section.whileInView}
        viewport={motionConfig.section.viewport}
        transition={motionConfig.section.transition}
        className="mt-20 pt-12 border-t border-gray-100"
      >
        <p className="text-base text-gray-600 mb-6">
          I partner with ambitious teams ready to rebuild systems — not optimize features.
        </p>
        <Link
          href="mailto:hello@davidgarzon.com"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white text-base font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Schedule a conversation
        </Link>
      </motion.div>
    </>
  )
}
