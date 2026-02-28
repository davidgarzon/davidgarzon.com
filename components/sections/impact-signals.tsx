'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const signals = [
  { title: 'Led orgs 10 → 65+', description: 'Scaled product teams across growth stages with structured operating cadences.' },
  { title: 'Built decision engines & scoring systems', description: 'Structured frameworks that encode product judgment and reduce cognitive overhead.' },
  { title: 'Multi-tenant SaaS foundations (RBAC, event-driven)', description: 'Platform architecture for B2B products with proper isolation and extensibility.' },
  { title: 'AI execution loops across marketing, sales, ops', description: 'Orchestrated AI agents that drive measurable outcomes across business functions.' },
  { title: 'P&L and unit economics mindset', description: 'Product decisions grounded in financial reality and business outcomes.' },
]

export function ImpactSignals() {
  return (
    <section className="py-32 px-6 bg-white border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">Impact Signals</h2>
          <p className="text-lg text-gray-500">What I bring to product leadership.</p>
        </motion.div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="grid md:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100"
        >
          {signals.map((signal, i) => (
            <div
              key={signal.title}
              className={`bg-white p-10 ${i === 4 ? 'md:col-span-2' : ''}`}
            >
              <h4 className="text-lg font-medium text-gray-900 mb-2">{signal.title}</h4>
              <p className="text-base text-gray-500 leading-relaxed">{signal.description}</p>
            </div>
          ))}
          <div className="bg-white p-10 md:col-span-3">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Measurable outcomes across business functions</h4>
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
              Focusing not just on output, but on the compound effect of well-orchestrated systems on the bottom line.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
