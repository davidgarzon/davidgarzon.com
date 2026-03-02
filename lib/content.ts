import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')
const projectsDirectory = path.join(contentDirectory, 'projects')

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  github: string | null
  live: string | null
  image: boolean
  featured: boolean
  order: number
  content: string
}

export function getProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  const projects = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        github: data.github || null,
        live: data.live || null,
        image: data.image === true,
        featured: data.featured || false,
        order: data.order || 99,
        content,
      } as Project
    })
    .sort((a, b) => a.order - b.order)
  return projects
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags || [],
    github: data.github || null,
    live: data.live || null,
    image: data.image === true,
    featured: data.featured || false,
    order: data.order || 99,
    content,
  } as Project
}

export function getContentFile(name: string): string {
  const fullPath = path.join(contentDirectory, `${name}.md`)
  if (!fs.existsSync(fullPath)) return ''
  return fs.readFileSync(fullPath, 'utf8')
}

const AGENT_CONTEXT_MODE = (process.env.AGENT_CONTEXT_MODE || 'auto') as 'auto' | 'env' | 'files'

function getFaqContent(): string {
  if (AGENT_CONTEXT_MODE === 'files') return getContentFile('faq')
  if (AGENT_CONTEXT_MODE === 'env') return (process.env.AGENT_FAQ || '').trim()
  // auto: prefer env
  const fromEnv = (process.env.AGENT_FAQ || '').trim()
  if (fromEnv) return fromEnv
  return getContentFile('faq')
}

function getAgentContextContent(): string {
  if (AGENT_CONTEXT_MODE === 'files') return getContentFile('agent')
  if (AGENT_CONTEXT_MODE === 'env') return (process.env.AGENT_CONTEXT || '').trim()
  // auto: prefer env
  const fromEnv = (process.env.AGENT_CONTEXT || '').trim()
  if (fromEnv) return fromEnv
  return getContentFile('agent')
}

export function getAllContent(): string {
  const parts: string[] = []

  // Public files (always from disk when present)
  const publicFiles = ['bio', 'principles', 'roles'] as const
  for (const name of publicFiles) {
    const content = getContentFile(name)
    if (content) parts.push(`--- ${name.toUpperCase()} ---\n\n${content}`)
  }

  // FAQ: from env or file depending on mode
  const faqContent = getFaqContent()
  if (faqContent) parts.push(`--- FAQ ---\n\n${faqContent}`)

  // Agent context: from env or file depending on mode
  const agentContent = getAgentContextContent()
  if (agentContent) parts.push(`--- AGENT ---\n\n${agentContent}`)

  // Projects (always from disk)
  const projects = getProjects()
  for (const project of projects) {
    parts.push(`--- PROJECT: ${project.title} ---\n\n${project.description}\n\n${project.content}`)
  }

  return parts.join('\n\n')
}
