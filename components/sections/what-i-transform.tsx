'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const statements = [
  'SaaS → AI-native operating systems',
  'Fragmented teams → Scalable product organizations',
  'Features → Structured decision engines',
  'Growth chaos → Monetized product systems',
  'Legacy stack → Platform architecture',
]

export function WhatITransform() {
  return (
    <section className="py-16 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-10"
        >
          What I Transform
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {statements.map((s, i) => (
            <motion.p
              key={s}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.04 }}
              className="text-lg font-medium text-gray-800"
            >
              {s}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
