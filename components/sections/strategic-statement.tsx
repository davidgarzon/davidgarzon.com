'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

export function StrategicStatement() {
  return (
    <div className="px-6 py-8 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="text-lg md:text-xl text-gray-600 leading-relaxed text-center max-w-2xl mx-auto"
        >
          Most companies don&apos;t fail because of lack of ideas.
          <br />
          They fail because their systems don&apos;t scale.
        </motion.p>
      </div>
    </div>
  )
}
