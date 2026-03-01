'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const bullets = [
  'Multi-agent orchestration',
  'Data enrichment & scoring systems',
  'AI-driven operational automation',
  'Product-led growth systems',
  'Scalable platform architecture',
  'Monetization & unit economics alignment',
]

export function AIPlatformThinking() {
  return (
    <section className="py-28 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Designing AI-Native Operating Systems
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            I design systems where multi-agent orchestration, scoring engines, and automation layers
            integrate into the operating model — not as bolt-ons but as structural capability. SaaS
            platform thinking, product-led growth, and unit economics alignment drive the architecture.
          </p>
        </motion.div>

        <motion.ul
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="grid md:grid-cols-2 gap-4"
        >
          {bullets.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base text-gray-600"
            >
              <span className="text-gray-400 mt-0.5">—</span>
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
