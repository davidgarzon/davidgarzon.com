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

export function getAllContent(): string {
  const files = ['bio', 'principles', 'roles', 'faq']
  let allContent = ''
  for (const file of files) {
    const content = getContentFile(file)
    if (content) {
      allContent += `\n\n--- ${file.toUpperCase()} ---\n\n${content}`
    }
  }
  const projects = getProjects()
  for (const project of projects) {
    allContent += `\n\n--- PROJECT: ${project.title} ---\n\n${project.description}\n\n${project.content}`
  }
  return allContent
}
