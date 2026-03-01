'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

export function PositioningLine() {
  return (
    <div className="px-6 py-8 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="text-lg font-medium text-gray-700"
        >
          I operate where complexity meets ambition.
        </motion.p>
      </div>
    </div>
  )
}
