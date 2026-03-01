'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motionConfig } from '@/lib/motion'

const roles = [
  {
    role: 'VP of Product & Technology',
    company: 'Plinng',
    location: 'Spain & Colombia',
    timeframe: '2024 – Present',
    description: 'AI-first SaaS platform operating as an AI Business Operator for SMBs.',
    bullets: [
      'Built and scaled Product & Engineering from 10 to 42 people across Product, Engineering, Data, AI and Platform.',
      'Delivered +60% operational efficiency through AI orchestration and automation systems.',
      'Achieved <4% churn in SMB SaaS environment.',
      'Owned product strategy, roadmap, monetization and executive decision-making.',
    ],
  },
  {
    role: 'Chief Product & Technology Officer',
    company: 'Rightboat',
    location: 'Barcelona',
    timeframe: '2023 – 2024',
    description: 'Marketplace platform undergoing scale-up transformation.',
    bullets: [
      'Led full platform rebuild improving reliability, scalability and speed.',
      'Achieved 120% of growth targets across leads, SEO and performance.',
      'Implemented scalable architecture, governance and delivery frameworks.',
    ],
  },
  {
    role: 'VP of Product & Data',
    company: 'Domestika',
    location: 'Barcelona',
    timeframe: '2022 – 2023',
    description: 'Global creative learning unicorn operating in 17 countries with 50M+ users.',
    bullets: [
      'Led Product, Design, Data, SEO and ASO with 15 direct reports (90+ matrix).',
      'Drove +20% growth above plan through product-led initiatives.',
      'Launched subscription model reaching 40% adoption and +50% LTV.',
      'Increased retention to 16 months and NPS to 78+.',
      'Reduced employee turnover by 23% through org redesign.',
    ],
  },
  {
    role: 'Director of Product',
    company: 'The Knot Worldwide',
    location: 'Barcelona',
    timeframe: '2018 – 2022',
    description: 'Global wedding technology company operating in 17 countries.',
    bullets: [
      'Led B2C, B2B, apps and e-commerce product across global markets.',
      'Delivered +60% leads and $6M revenue during COVID pivot.',
      'Drove +20% SEO revenue uplift and +50% reviews.',
      'Built ML-based personalization system at scale.',
    ],
  },
  {
    role: 'Founder & CPO',
    company: 'GoTrendier',
    location: 'Mexico & Colombia',
    timeframe: '2015 – 2018',
    description: 'VC-backed second-hand fashion marketplace.',
    bullets: [
      'Scaled to 15M+ transactions with 14 purchases per user annually.',
      'Achieved payback in under 4 months.',
      'Led influencer-driven growth with top LATAM creators.',
    ],
  },
  {
    role: 'Founder & Digital Director',
    company: 'WazoMedia',
    location: 'Mexico',
    timeframe: '2014 – 2016',
    description: 'Digital performance agency serving major LATAM brands.',
    bullets: [
      'Generated MXN 16M revenue in one month for AT&T LATAM.',
      'Delivered +60% SEO growth for Aeroméxico.',
      'Built and scaled performance marketing operations.',
    ],
  },
  {
    role: 'Co-Founder & CTO',
    company: 'Fanscup',
    location: 'Barcelona',
    timeframe: '2005 – 2014',
    description: "One of Europe's first vertical social networks for football fans.",
    bullets: [
      'Reached 50M users across 17 countries and 13 languages.',
      'Managed 1,000+ sites, 600 apps and 60k concurrent users.',
      'Built ML moderation system handling millions of posts with <5 engineers.',
    ],
  },
]

export function ExperienceContent() {
  return (
    <>
      <motion.div
        {...motionConfig.section}
        transition={motionConfig.section.transition}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Executive Experience
        </h1>
        <p className="max-w-3xl text-lg text-gray-600 leading-relaxed">
          AI-native Product & Technology executive. Built & scaled SaaS platforms globally.
          Owned product, tech, data & P&L. Reported to CEO / Board.
        </p>
      </motion.div>

      <motion.div
        initial={motionConfig.section.initial}
        whileInView={motionConfig.section.whileInView}
        viewport={motionConfig.section.viewport}
        transition={motionConfig.section.transition}
      >
        <div className="space-y-0">
          {roles.map((r, i) => (
            <motion.div
              key={`${r.company}-${r.timeframe}`}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: i * 0.04 }}
              className="py-8 border-b border-gray-100 last:border-0"
            >
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                {r.role} — {r.company}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {r.location} | {r.timeframe}
              </p>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                {r.description}
              </p>
              <ul className="mt-4 space-y-2 pl-0">
                {r.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-gray-400 mt-1.5 shrink-0">—</span>
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
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <Link
            href="/work"
            className="inline-flex items-center text-gray-600 text-base font-medium hover:text-gray-900 transition-colors group"
          >
            View product systems
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </motion.div>
    </>
  )
}
