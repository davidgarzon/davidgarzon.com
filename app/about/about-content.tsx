'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const principles = [
  {
    title: 'Systems Over Features',
    description:
      'I don\'t build features in isolation. Every product decision is part of a larger system that compounds over time. The goal is to create self-reinforcing loops, not one-off deliverables.',
  },
  {
    title: 'AI as a Collaborator',
    description:
      'AI isn\'t a bolt-on. It\'s a design partner. I build products where intelligence is woven into the architecture from day one — augmenting decisions, automating workflows, and continuously learning.',
  },
  {
    title: 'Compounding Over Heroics',
    description:
      'Sustainable velocity beats sprint burnouts. I invest in processes, tools, and architectures that make next month\'s work easier than this month\'s.',
  },
  {
    title: 'Measurement as a Habit',
    description:
      'If we can\'t measure it, we can\'t improve it. But measurement isn\'t just dashboards — it\'s building a culture where data informs judgment without replacing it.',
  },
]

export function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start mb-24">
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
          <Image
            src="/portrait.png"
            alt="David Garzón"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900">About</h1>
          <p className="mt-3 text-lg text-gray-500">
            Founder mindset. Systems thinker. AI-native builder.
          </p>

          <div className="mt-12 space-y-6 text-lg text-gray-500">
            <p>
              I&apos;m a product leader based in Barcelona who builds at the intersection
              of AI, decision systems, and business operations. My work is driven by a
              simple belief: the best products aren&apos;t built by adding features — they&apos;re
              built by designing systems that compound intelligence over time.
            </p>
            <p>
              I&apos;ve led product teams across fintech, SaaS, and marketplace
              environments, always with a focus on turning ambiguity into structured
              execution. I care deeply about how teams make decisions, and I design
              both the products and the processes that make those decisions better.
            </p>
            <p>
              I operate with a founder mindset regardless of my title. I understand
              P&amp;L mechanics, growth levers, and the financial reality behind every
              product bet. This means I don&apos;t just ship features — I ship outcomes
              that move the business.
            </p>
            <p>
              My leadership style is direct but collaborative. I create clarity,
              remove ambiguity, and give teams the space to do their best work while
              holding everyone (including myself) accountable to results.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          How I Think About AI-Native Companies
        </h2>
        <div className="mt-6 space-y-4 text-lg text-gray-500">
          <p>
            AI-native doesn&apos;t mean using ChatGPT in your workflow. It means
            your product&apos;s architecture is fundamentally designed around
            intelligence — where AI isn&apos;t an add-on but the core engine that
            drives value.
          </p>
          <p>
            This requires a different product mindset. You need to think about
            feedback loops, not just features. About orchestration, not just
            integration. About systems that learn, not just systems that execute.
          </p>
          <p>
            The companies that will win in the next decade are the ones that
            treat AI as a structural advantage — embedding it into their decision
            layer, their operations, and their customer experience from the
            ground up.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">
          Roles I&apos;m Open To
        </h2>
        <p className="mb-8 text-gray-500">
          VP Product · Head of Product · Product Leader
        </p>
        <p className="mb-12 text-lg text-gray-500">
          AI-native or AI-forward companies where product strategy, team leadership, and hands-on building are all part of the job. Barcelona-based or remote-first.
        </p>
      </div>

      <div className="mt-24">
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-gray-900">
          Operating Principles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <h3 className="mb-2 text-sm font-semibold">{principle.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
