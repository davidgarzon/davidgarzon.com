import type { Metadata } from 'next'
import { SkillsGrid } from './skills-grid'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Product strategy, AI systems, decision engines, growth, finance discipline — capabilities that drive AI-native product execution.',
}

const skillCategories = [
  {
    title: 'Product Strategy',
    signals: [
      'Define product vision and roadmap aligned to business outcomes',
      'Prioritize ruthlessly using frameworks like RICE, ICE, and custom scoring',
      'Translate ambiguous problems into clear product hypotheses',
      'Run discovery processes that reduce risk before committing resources',
    ],
  },
  {
    title: 'AI Systems',
    signals: [
      'Design end-to-end AI product architectures from prompt to production',
      'Evaluate model capabilities and limitations for real-world use cases',
      'Build feedback loops that continuously improve AI system performance',
      'Ship AI features that users trust and actually adopt',
    ],
  },
  {
    title: 'Decision Engines',
    signals: [
      'Build structured frameworks that encode product judgment',
      'Automate decision workflows using rules, scoring, and ML',
      'Reduce cognitive overhead for teams making repeated decisions',
      'Create audit trails for accountability and learning',
    ],
  },
  {
    title: 'Data & Scoring',
    signals: [
      'Design metric hierarchies from north star to team-level KPIs',
      'Build scoring systems for leads, experiments, and prioritization',
      'Run A/B tests with statistical rigor and practical interpretation',
      'Turn qualitative insights into quantitative signals',
    ],
  },
  {
    title: 'Engineering Leadership',
    signals: [
      'Lead cross-functional teams of engineers, designers, and data scientists',
      'Set technical direction without micromanaging implementation',
      'Balance speed and quality through iterative delivery',
      'Create environments where engineers feel ownership and autonomy',
    ],
  },
  {
    title: 'Growth & Paid Literacy',
    signals: [
      'Understand CAC, LTV, payback period, and channel economics',
      'Collaborate with growth and marketing on acquisition strategies',
      'Design product-led growth loops and activation funnels',
      'Connect product decisions to revenue impact',
    ],
  },
  {
    title: 'Finance & P&L Thinking',
    signals: [
      'Read and interpret P&L statements and unit economics',
      'Build business cases for product investments',
      'Optimize for margins, not just growth',
      'Align product decisions with company-level financial goals',
    ],
  },
  {
    title: 'Ops Automation',
    signals: [
      'Identify repetitive workflows ripe for automation',
      'Design multi-agent systems for business process orchestration',
      'Build internal tools that compound team productivity',
      'Reduce toil through systematic process improvement',
    ],
  },
]

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28 lg:px-8">
      <div className="mb-16">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900">Skills</h1>
        <p className="mt-3 max-w-2xl text-lg text-gray-500">
          Capabilities that drive AI-native product execution — from strategy to
          systems to growth.
        </p>
      </div>

      <SkillsGrid categories={skillCategories} />
    </div>
  )
}
