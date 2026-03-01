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
    <section className="py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            How I Work
          </h2>
          <p className="text-base text-gray-500">A compounding loop, not a linear process.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto md:mx-0">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gray-200" aria-hidden />

          <div className="grid md:grid-cols-5 gap-8 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={motionConfig.section.initial}
                whileInView={motionConfig.section.whileInView}
                viewport={motionConfig.section.viewport}
                transition={{ ...motionConfig.section.transition, delay: i * 0.06 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 shadow-sm shrink-0 ${
                    i === 2 ? 'bg-gray-900 text-white border-0' : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className={`text-base font-medium ${i === 2 ? 'text-white' : 'text-gray-500'}`}>
                    {i + 1}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{step.label}</h4>
                <p className="text-sm text-gray-600 leading-snug">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="mt-12 max-w-2xl space-y-6"
        >
          <p className="text-base text-gray-500 leading-relaxed">
            I don&apos;t build features. I design systems. AI is not an add-on. It is operational capability.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            I&apos;ve rebuilt platforms, merged tech stacks and led AI pivots under pressure. Systems thinking isn&apos;t theory for me — it&apos;s operational survival.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
