'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const steps = [
  { label: 'Discovery', description: 'Deep research and user understanding' },
  { label: 'System Design', description: 'Architecture and decision frameworks' },
  { label: 'Execution Loops', description: 'Rapid iteration with feedback' },
  { label: 'Measurement', description: 'Data-driven validation' },
  { label: 'Compounding', description: 'Systematic knowledge accumulation' },
]

export function HowIWork() {
  return (
    <section className="py-32 px-6 border-t border-gray-100/50 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-24 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">How I Work</h2>
          <p className="text-lg text-gray-500">A compounding loop, not a linear process.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gray-200" aria-hidden />

          <div className="grid md:grid-cols-5 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={motionConfig.section.initial}
                whileInView={motionConfig.section.whileInView}
                viewport={motionConfig.section.viewport}
                transition={{ ...motionConfig.section.transition, delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm ${
                    i === 2 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className={`text-base font-medium ${i === 2 ? '' : 'text-gray-500'}`}>
                    {i + 1}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">{step.label}</h4>
                <p className="text-base text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
