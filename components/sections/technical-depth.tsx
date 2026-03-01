'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const bullets = [
  'Multi-agent systems',
  'AI orchestration frameworks',
  'Scoring & enrichment engines',
  'Platform redesign',
  'Product-led growth systems',
]

export function TechnicalDepth() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-4"
        >
          Technical Depth
        </motion.h2>
        <motion.p
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="text-base text-gray-600 mb-8 max-w-2xl"
        >
          I operate across product strategy, architecture, data infrastructure and AI orchestration.
        </motion.p>
        <ul className="space-y-2">
          {bullets.map((item, i) => (
            <motion.li
              key={item}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.03 }}
              className="flex items-start gap-2 text-base text-gray-700"
            >
              <span className="text-gray-400">—</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
