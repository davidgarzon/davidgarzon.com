'use client'

import { motion } from 'framer-motion'
import { Layers, Cpu, TrendingUp } from 'lucide-react'
import { motionConfig } from '@/lib/motion'

const pillars = [
  {
    icon: Layers,
    title: 'Product Systems',
    description: 'Building structured decision frameworks that scale product thinking beyond individual features into compounding systems.',
  },
  {
    icon: Cpu,
    title: 'AI Orchestration',
    description: 'Designing multi-agent architectures where specialized AI components collaborate to solve complex business problems autonomously.',
  },
  {
    icon: TrendingUp,
    title: 'Growth + Finance Discipline',
    description: 'Applying P&L thinking and growth mechanics to product decisions, ensuring every initiative connects to measurable business outcomes.',
  },
]

export function Pillars() {
  return (
    <section className="py-32 px-6 border-t border-gray-100/50 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">Three Pillars</h2>
          <p className="text-lg text-gray-500">Product systems, AI orchestration, growth discipline.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={motionConfig.section.initial}
                whileInView={motionConfig.section.whileInView}
                viewport={motionConfig.section.viewport}
                transition={{ ...motionConfig.section.transition, delay: i * 0.08 }}
                className="group relative p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-8 relative z-10">
                  <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-3 relative z-10 text-gray-900">{pillar.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed relative z-10">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
