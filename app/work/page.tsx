import type { Metadata } from 'next'
import { getProjects } from '@/lib/content'
import { WorkGrid } from './work-grid'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Systems and products I have designed and built — from AI decision engines to multi-agent orchestration platforms.',
}

export default function WorkPage() {
  const projects = getProjects()
  const liveProducts = projects.filter((p) => p.image).sort((a, b) => a.order - b.order)
  const systemsAndConcepts = projects.filter((p) => !p.image).sort((a, b) => a.order - b.order)

  const mapProject = (p: (typeof projects)[0]) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    github: p.github,
    live: p.live,
    image: p.image,
  })

  return (
    <div className="mx-auto max-w-6xl px-6 py-28 lg:px-8">
      <div className="mb-20">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900">Work</h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-500">
          Systems and products I have designed and built — from AI decision engines to multi-agent orchestration platforms.
        </p>
      </div>

      <WorkGrid
        liveProducts={liveProducts.map(mapProject)}
        systemsAndConcepts={systemsAndConcepts.map(mapProject)}
      />
    </div>
  )
}
