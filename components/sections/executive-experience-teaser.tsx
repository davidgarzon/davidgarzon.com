'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motionConfig } from '@/lib/motion'

export function ExecutiveExperienceTeaser() {
  return (
    <section className="py-28 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3">
              Executive Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Full executive track record across SaaS, marketplaces and AI-first platforms.
            </p>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center text-gray-900 text-base font-medium hover:text-gray-600 transition-colors group shrink-0"
          >
            View Executive Experience
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
