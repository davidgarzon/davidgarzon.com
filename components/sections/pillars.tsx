'use client'

import { motion } from 'framer-motion'
import { Layers, Cpu, TrendingUp } from 'lucide-react'
import { motionConfig } from '@/lib/motion'

const pillars = [
  {
    icon: Layers,
    title: 'Product & Platform Systems',
    description: 'Designing structured decision engines that reduce ambiguity and scale execution.',
  },
  {
    icon: Cpu,
    title: 'AI as Operational Infrastructure',
    description: 'Embedding intelligence into architecture — not as an add-on, but as core infrastructure.',
  },
  {
    icon: TrendingUp,
    title: 'Product-Led Financial Discipline',
    description: 'Aligning product strategy with unit economics and measurable business outcomes.',
  },
]

export function Pillars() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">Three Pillars</h2>
          <p className="text-base text-gray-500">How I build AI-native organizations.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={motionConfig.section.initial}
                whileInView={motionConfig.section.whileInView}
                viewport={motionConfig.section.viewport}
                transition={{ ...motionConfig.section.transition, delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-5 relative z-10">
                  <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 relative z-10 text-gray-900">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed relative z-10">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
