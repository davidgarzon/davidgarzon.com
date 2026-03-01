'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const leftColumn = [
  {
    title: 'Product Strategy',
    bullets: [
      'Vision & roadmap alignment',
      'Hypothesis-driven execution',
      'Prioritization frameworks',
      'Product operating models',
    ],
  },
  {
    title: 'Decision Systems',
    bullets: [
      'Structured decision frameworks',
      'Automated scoring engines',
      'Experimentation architecture',
      'Governance & audit trails',
    ],
  },
]

const rightColumn = [
  {
    title: 'AI Systems',
    bullets: [
      'Multi-agent orchestration',
      'AI architecture from prompt to production',
      'Feedback loops & evaluation',
      'AI adoption & trust design',
    ],
  },
  {
    title: 'Data & Growth',
    bullets: [
      'Metric hierarchies & North Star',
      'PLG systems',
      'LTV / CAC optimization',
      'Unit economics alignment',
    ],
  },
]

function CapabilityBlock({ title, bullets, index }: { title: string; bullets: string[]; index: number }) {
  return (
    <motion.div
      initial={motionConfig.section.initial}
      whileInView={motionConfig.section.whileInView}
      viewport={motionConfig.section.viewport}
      transition={{ ...motionConfig.section.transition, delay: index * 0.05 }}
      className="mb-8 last:mb-0"
    >
      <h3 className="text-base font-semibold tracking-tight text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-gray-400">·</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Capabilities() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Capabilities
          </h2>
          <p className="text-base text-gray-500">
            Across product strategy, AI systems and organizational scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          <div>
            {leftColumn.map((block, i) => (
              <CapabilityBlock key={block.title} {...block} index={i} />
            ))}
          </div>
          <div>
            {rightColumn.map((block, i) => (
              <CapabilityBlock key={block.title} {...block} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
