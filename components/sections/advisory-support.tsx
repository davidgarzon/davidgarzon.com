'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const bullets = [
  'Fractional CPO / CPTO',
  'AI transformation strategy',
  'Product & tech org redesign',
  'Executive mentoring',
  'Board-level product positioning',
  'P&L and monetization structuring',
]

export function AdvisorySupport() {
  return (
    <section className="py-28 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Advisory & Executive Support
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-6">
            I support leadership teams in AI-first transformation, product operating model redesign
            and platform scaling.
          </p>
          <ul className="space-y-3">
            {bullets.map((item, i) => (
              <motion.li
                key={item}
                initial={motionConfig.section.initial}
                whileInView={motionConfig.section.whileInView}
                viewport={motionConfig.section.viewport}
                transition={{ ...motionConfig.section.transition, delay: i * 0.04 }}
                className="flex items-start gap-3 text-base text-gray-600"
              >
                <span className="text-gray-400 mt-0.5">—</span>
                {item}
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-500">
            Former Lecturer at ISDI (2 years).
          </p>
        </motion.div>
      </div>
    </section>
  )
}
