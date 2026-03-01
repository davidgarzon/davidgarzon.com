import type { Metadata } from 'next'
import { ExperienceContent } from './experience-content'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'AI-native Product & Technology executive. Built & scaled SaaS platforms globally. Led teams up to 52 direct reports. Owned product, tech, data & P&L.',
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-8">
      <ExperienceContent />
    </div>
  )
}
