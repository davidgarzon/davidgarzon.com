import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const processed = await remark().use(html).process(project.content)
  const contentHtml = processed.toString()

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-10 -ml-2 gap-1.5 rounded-lg text-gray-500 hover:text-gray-900">
        <Link href="/work">
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900">{project.title}</h1>
      <p className="mt-4 text-lg text-gray-500">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {project.github && (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github size={14} />
              Repository
            </a>
          </Button>
        )}
        {project.live && (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight size={14} />
              Live Site
            </a>
          </Button>
        )}
      </div>

      <div className="mt-16 border-t border-gray-200 pt-12">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  )
}
