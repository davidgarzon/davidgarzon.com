'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ArrowUpRight } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { projects } from '@/lib/projects-data'
import { motionConfig } from '@/lib/motion'

export function FeaturedProjects() {
  return (
    <section className="py-32 px-6 border-t border-gray-100/50 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-500">Systems I&apos;ve designed and built.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.06 }}
            >
              <Link
                href={`/work/${project.slug}`}
                onClick={() => trackEvent(ANALYTICS_EVENTS.PROJECT_CARD_CLICKED, { project_slug: project.slug })}
                className="group flex flex-col p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow h-full"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-medium tracking-tight mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                  {project.github && (
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 flex items-center gap-1.5 transition-colors">
                      <Github className="w-4 h-4" strokeWidth={1.5} />
                      Repo
                    </span>
                  )}
                  {project.live && (
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 flex items-center gap-1.5 transition-colors">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                      Live
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
