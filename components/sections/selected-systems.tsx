'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'
import { projects } from '@/lib/projects-data'

const SELECTED_SLUGS = ['prd-decision-engine', 'experiment-crm', 'multi-agent-business-operator']

export function SelectedSystems() {
  const selected = projects
    .filter((p) => SELECTED_SLUGS.includes(p.slug))
    .sort((a, b) => SELECTED_SLUGS.indexOf(a.slug) - SELECTED_SLUGS.indexOf(b.slug))

  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-8"
        >
          Selected Systems
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {selected.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.05 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="block p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-base font-semibold tracking-tight text-gray-900 group-hover:text-gray-700">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
        >
          <Link
            href="/work"
            className="inline-flex items-center text-base font-medium text-gray-700 hover:text-gray-900 transition-colors group"
          >
            View all systems
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
