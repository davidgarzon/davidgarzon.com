'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const flowSteps = [
  'Problem',
  'Signal',
  'System',
  'Automation',
  'Experience',
  'Metric',
  'Iteration',
]

export function HowIThink() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            How I Think
          </h2>
        </motion.div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 md:gap-4 justify-center md:justify-start pb-6 border-b border-gray-200">
            {flowSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2 md:gap-4">
                <span className="text-sm font-medium text-gray-700">{step}</span>
                {i < flowSteps.length - 1 && (
                  <span className="text-gray-300 hidden sm:inline">→</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="max-w-2xl text-lg text-gray-700 leading-relaxed"
        >
          <p className="font-medium text-gray-900">
            I don&apos;t build features. I design systems. AI is not an add-on. It is operational capability.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
