'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

interface WorkProject {
  slug: string
  title: string
  description: string
  tags: string[]
  github: string | null
  live: string | null
}

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <Link
            href={`/work/${project.slug}`}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.PROJECT_CARD_CLICKED, {
                project_slug: project.slug,
              })
            }
            className="group flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="aspect-[16/9] rounded-2xl bg-gray-100 border border-gray-50 mb-6 flex items-center justify-center" aria-hidden>
              <span className="text-xs text-gray-400">Screenshot</span>
            </div>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-gray-700">
              {project.title}
            </h2>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[11px] font-normal text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {project.github && (
                <span className="flex items-center gap-1.5">
                  <Github size={13} /> Repository
                </span>
              )}
              {project.live && (
                <span className="flex items-center gap-1.5">
                  <ArrowUpRight size={13} /> Live
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
