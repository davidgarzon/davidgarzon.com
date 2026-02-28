'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

interface SkillCategory {
  title: string
  signals: string[]
}

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {categories.map((category, i) => (
        <motion.div
          key={category.title}
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={{
            ...motionConfig.section.transition,
            delay: i * 0.06,
          }}
          className="rounded-3xl border border-gray-100 bg-[#FAFAFA] p-8 transition-all duration-200 hover:border-gray-200/80"
        >
          <h2 className="mb-4 text-base font-semibold tracking-tight text-gray-900">
            {category.title}
          </h2>
          <ul className="space-y-2.5">
            {category.signals.map((signal) => (
              <li
                key={signal}
                className="flex items-start gap-3 text-[14px] leading-relaxed text-gray-500"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {signal}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
