import type { Metadata } from 'next'
import { AboutContent } from './about-content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Founder mindset, systems thinker, AI-native philosophy — the principles and operating style behind how I build products.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 lg:px-8">
      <AboutContent />
    </div>
  )
}
