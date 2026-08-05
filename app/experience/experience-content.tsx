'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motionConfig } from '@/lib/motion'

const roles = [
  {
    role: 'Founder & Fractional Product Leader',
    company: 'Kenva Labs',
    location: 'Barcelona',
    timeframe: '2026 – Present',
    description: 'Independent product and AI practice.',
    bullets: [
      'Founder of an independent product and AI practice advising leadership teams on AI-native product strategy.',
      'Clients include Prixz (Mexico’s leading online pharmacy) and PrimePlayers.',
      'More at kenvalabs.com.',
    ],
  },
  {
    role: 'VP of AI Product & Engineering',
    company: 'Orbidi / Plinng',
    location: 'Spain & Colombia',
    timeframe: '2024 – 2026',
    description: 'AI-first SaaS platform operating as an AI Business Operator for SMBs.',
    bullets: [
      'Scaled Product & Engineering from 7 to 42 people across Product, Engineering, Data, AI and Platform.',
      'Reached €1M ARR in four months, serving 9,000+ businesses.',
      'Shipped an AI customer-service agent, pulled it from production two days after launch when 5% of responses were hallucinating, rebuilt it with human review gating output, now resolving 75-78% of conversations.',
      'Kept churn below 4% in an SMB SaaS environment.',
    ],
  },
  {
    role: 'Chief Product & Technology Officer',
    company: 'Rightboat',
    location: 'London',
    timeframe: '2023 – 2024',
    description: 'Marketplace platform undergoing scale-up transformation.',
    bullets: [
      'Rebuilt the entire platform in 2 months.',
      'Achieved 120% of growth targets across leads, SEO and performance.',
      'Implemented scalable architecture, governance and delivery frameworks.',
    ],
  },
  {
    role: 'VP of Product & Data',
    company: 'Domestika',
    location: 'Barcelona',
    timeframe: '2022 – 2023',
    description: 'Global creative learning platform.',
    bullets: [
      'Led an organisation of 90 people across Product, Design, Data, SEO and ASO, with 52 in product and 8 direct reports.',
      'Launched the subscription model, reaching 40% adoption, +50% LTV, retention to 16 months and NPS 78+.',
      'Used AI dubbing and transcription to open 3 new markets on under $60k.',
      'Reduced employee turnover by 23% through org redesign.',
    ],
  },
  {
    role: 'Director of Product Management',
    company: 'The Knot Worldwide',
    location: 'Barcelona',
    timeframe: '2018 – 2022',
    description: 'Global wedding technology company operating in 17 countries.',
    bullets: [
      'Led product across 17 countries with a team of 65.',
      'Delivered +60% leads and $6M revenue in 6 months during the COVID pivot.',
      'Built ML-based personalization across the marketplace.',
      'Drove +20% SEO revenue uplift, +50% reviews and NPS 78+.',
    ],
  },
  {
    role: 'Founder',
    company: 'GoTrendier',
    location: 'Mexico & Colombia',
    timeframe: '2015 – 2018',
    description: 'VC-backed second-hand fashion marketplace.',
    bullets: [
      'Scaled to 15M+ transactions with 14 purchases per user per year.',
      'Achieved payback in under 4 months.',
      'Led influencer-driven growth with top LATAM creators.',
    ],
  },
  {
    role: 'Co-Founder',
    company: 'WazoMedia',
    location: 'Mexico',
    timeframe: '2014 – 2016',
    description: 'Digital performance agency serving major LATAM brands.',
    bullets: [
      'Generated MXN 16M revenue in one month for AT&T LATAM.',
      'Delivered +40% SEO growth for Aeroméxico.',
      'Built and scaled performance marketing operations.',
    ],
  },
  {
    role: 'Co-Founder',
    company: 'Fanscup',
    location: 'Barcelona',
    timeframe: '2005 – 2014',
    description: "One of Europe's first vertical social networks for football fans.",
    bullets: [
      'Reached 50M users across 17 countries and 13 languages.',
      'Managed 1,000+ sites, 600 apps and 60k concurrent users.',
      'Built ML content moderation with a team of fewer than 5.',
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
          <p className="text-sm text-gray-500 mb-6">
            Former Lecturer at ISDI (2 years).
          </p>
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
