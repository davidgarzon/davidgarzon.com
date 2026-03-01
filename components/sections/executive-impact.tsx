'use client'

import { motion } from 'framer-motion'
import { motionConfig } from '@/lib/motion'

const clusters = [
  {
    heading: 'Scale',
    metrics: [
      { value: '50M+', label: 'users' },
      { value: '17', label: 'countries' },
      { value: '96-person', label: 'organization footprint' },
      { value: '15', label: 'direct reports' },
    ],
  },
  {
    heading: 'Performance',
    metrics: [
      { value: '+60%', label: 'operational efficiency' },
      { value: '<4%', label: 'churn' },
      { value: '+50%', label: 'LTV' },
      { value: '+20%', label: 'growth above plan' },
    ],
  },
  {
    heading: 'Execution',
    metrics: [
      { value: '10 → 42', label: 'team scale in under 2 years' },
      { value: '$6M', label: 'revenue pivot in 6 months' },
      { value: '120%', label: 'growth target achieved' },
      { value: '40%', label: 'subscription adoption' },
    ],
  },
]

function AnimatedMetric({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={motionConfig.section.initial}
      whileInView={motionConfig.section.whileInView}
      viewport={motionConfig.section.viewport}
      transition={{ ...motionConfig.section.transition, delay: index * 0.03 }}
      className="border-b border-gray-100 py-4"
    >
      <div className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </motion.div>
  )
}

export function ExecutiveImpact() {
  return (
    <section className="py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]/50">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...motionConfig.section}
          transition={motionConfig.section.transition}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Executive Impact
          </h2>
          <p className="text-base text-gray-500">
            Measured outcomes across product, AI, and P&L ownership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-0">
          {clusters.map((cluster, clusterIndex) => (
            <motion.div
              key={cluster.heading}
              initial={motionConfig.section.initial}
              whileInView={motionConfig.section.whileInView}
              viewport={motionConfig.section.viewport}
              transition={{ ...motionConfig.section.transition, delay: clusterIndex * 0.05 }}
            >
              <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6">
                {cluster.heading}
              </h3>
              <div className="space-y-0">
                {cluster.metrics.map((metric, i) => (
                  <AnimatedMetric
                    key={metric.label}
                    value={metric.value}
                    label={metric.label}
                    index={clusterIndex * 4 + i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
