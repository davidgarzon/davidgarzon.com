export interface ProjectInfo {
  slug: string
  title: string
  description: string
  tags: string[]
  github: string | null
  live: string | null
}

export const projects: ProjectInfo[] = [
  {
    slug: 'prd-decision-engine',
    title: 'PRD Decision Engine',
    description:
      'An AI-powered system that transforms product requirements into structured decision frameworks, enabling faster and more consistent product decisions.',
    tags: ['AI', 'Decision Systems', 'Product Management', 'LLM'],
    github: 'https://github.com/davidgarzon',
    live: null,
  },
  {
    slug: 'experiment-crm',
    title: 'Experiment CRM',
    description:
      'A structured system for managing product experiments, tracking hypotheses, results, and learnings across teams.',
    tags: ['Experimentation', 'Product Analytics', 'CRM', 'Data'],
    github: 'https://github.com/davidgarzon',
    live: null,
  },
  {
    slug: 'multi-agent-business-operator',
    title: 'Multi-Agent Business Operator',
    description:
      'An autonomous multi-agent system that orchestrates business operations using specialized AI agents for different business functions.',
    tags: ['Multi-Agent', 'AI Orchestration', 'Automation', 'Business Operations'],
    github: 'https://github.com/davidgarzon',
    live: null,
  },
  {
    slug: 'ateneai',
    title: 'AteneAI',
    description:
      'An AI-native platform designed to augment decision-making and knowledge management for teams.',
    tags: ['AI Platform', 'Knowledge Management', 'SaaS', 'Decision Support'],
    github: null,
    live: 'https://ateneai.com',
  },
  {
    slug: 'comotrabajan',
    title: 'ComoTrabajan',
    description:
      'A platform that brings transparency to how companies operate, helping professionals make informed career decisions.',
    tags: ['Marketplace', 'Transparency', 'Culture', 'HR Tech'],
    github: null,
    live: 'https://comotrabajan.com',
  },
]
