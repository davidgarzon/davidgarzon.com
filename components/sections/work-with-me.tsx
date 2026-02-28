'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const blocks = [
  {
    title: 'Fractional Product Leadership',
    items: [
      'AI strategy definition',
      'Product architecture audits',
      'Orchestration & system design',
      'Team structure & decision frameworks',
    ],
  },
  {
    title: 'Advisory & Board Support',
    items: [
      'Investment-readiness review',
      'PRD & roadmap critique',
      'Execution risk evaluation',
      'Org design & product culture',
    ],
  },
  {
    title: 'Mentoring & Education',
    items: [
      'Product leadership mentoring',
      'AI-native product systems',
      'Guest lecturer at ISDI (2 years)',
      'Executive workshops',
    ],
  },
]

export function WorkWithMe() {
  return (
    <section className="py-32 px-6 border-t border-gray-100/50 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">Work With Me</h2>
          <p className="text-lg text-gray-500">Strategic product leadership for companies navigating AI transformation.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.06 }}
              className="rounded-3xl bg-white border border-gray-100 p-8"
            >
              <h3 className="mb-4 text-lg font-medium tracking-tight text-gray-900">{block.title}</h3>
              <ul className="space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-500"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
