'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
  image: boolean
}

function LiveProductCard({ project, index }: { project: WorkProject; index: number }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.PROJECT_CARD_CLICKED, { project_slug: project.slug })
        }
        className="group flex h-full flex-col rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md"
      >
        {!imageFailed ? (
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 border border-gray-50 mb-6 relative">
            <Image
              src={`/work/${project.slug}.png`}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : null}
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-gray-700">
          {project.title}
        </h2>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[11px] font-normal text-gray-600"
            >
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
  )
}

function SystemConceptCard({ project, index }: { project: WorkProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={() =>
          trackEvent(ANALYTICS_EVENTS.PROJECT_CARD_CLICKED, { project_slug: project.slug })
        }
        className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FAFAFA] p-6 transition-all duration-200 hover:border-gray-200 hover:bg-white"
      >
        <span className="mb-3 inline-block text-[10px] font-medium uppercase tracking-wider text-gray-400">
          System
        </span>
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-gray-700">
          {project.title}
        </h2>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-100 bg-white px-2.5 py-0.5 text-[11px] font-normal text-gray-600"
            >
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
  )
}

interface WorkGridProps {
  liveProducts: WorkProject[]
  systemsAndConcepts: WorkProject[]
}

export function WorkGrid({ liveProducts = [], systemsAndConcepts = [] }: WorkGridProps) {
  return (
    <div className="space-y-20">
      {liveProducts.length > 0 && (
        <section>
          <div className="mb-10">
            <h2 className="text-2xl font-medium tracking-tight text-gray-900">Live Products</h2>
            <p className="mt-1 text-base text-gray-500">Products with live interfaces.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {liveProducts.map((project, i) => (
              <LiveProductCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {systemsAndConcepts.length > 0 && (
        <section>
          <div className="mb-10">
            <h2 className="text-2xl font-medium tracking-tight text-gray-900">Systems & Concepts</h2>
            <p className="mt-1 text-base text-gray-500">Architectural frameworks and product systems.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {systemsAndConcepts.map((project, i) => (
              <SystemConceptCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
