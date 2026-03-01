'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { motionConfig } from '@/lib/motion'

const roles = [
  {
    role: 'VP Product / CPO',
    company: 'Plinng',
    timeframe: '2024 – present',
    description: 'AI-first transformation',
    bullets: [
      'Led product org through AI-native platform pivot',
      'Scaled decision systems and multi-agent orchestration',
      'Product-led growth and monetization strategy',
    ],
  },
  {
    role: 'Head of Product',
    company: 'Domestika',
    timeframe: '2021 – 2024',
    description: 'Unicorn scale',
    bullets: [
      'Scaled product teams across 17 countries',
      'Marketplace and subscription product leadership',
      'Platform architecture and data systems',
    ],
  },
  {
    role: 'Director of Product',
    company: 'The Knot Worldwide',
    timeframe: '2018 – 2021',
    description: 'Global platform',
    bullets: [
      'Multi-brand product strategy and execution',
      'SMB SaaS and marketplace operations',
      '1,000+ sites / 60k concurrent users',
    ],
  },
  {
    role: 'Founder / Head of Product',
    company: 'GoTrendier, Fanscup, WazoMedia',
    timeframe: '2014 – 2018',
    description: 'Founder experience',
    bullets: [
      '$6M revenue pivot in 6 months',
      'Built and scaled product teams from 0',
      'Unit economics and growth systems',
    ],
  },
]

export function ExecutiveExperience() {
  return (
    <section className="py-28 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={{ ...motionConfig.section.transition, delay: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Executive Experience
          </h2>
          <p className="text-lg text-gray-500">Roles, companies and impact.</p>
        </motion.div>

        <div className="space-y-0">
          {roles.map((r, i) => (
            <motion.div
              key={r.company}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.06 }}
              className="py-8 border-b border-gray-100 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900">{r.role}</h3>
                  <p className="text-gray-600 font-medium">{r.company}</p>
                  <p className="text-sm text-gray-500 mt-1">{r.description}</p>
                </div>
                <p className="text-sm text-gray-500 shrink-0">{r.timeframe}</p>
              </div>
              <ul className="mt-4 space-y-2 pl-0">
                {r.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-gray-400 mt-1.5">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={motionConfig.section.initial}
          whileInView={motionConfig.section.whileInView}
          viewport={motionConfig.section.viewport}
          transition={motionConfig.section.transition}
          className="mt-12"
        >
          <Link
            href="/work"
            className="inline-flex items-center text-gray-600 text-base font-medium hover:text-gray-900 transition-colors group"
          >
            View case studies
            <span className="ml-1 group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
