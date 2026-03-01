import type { Metadata } from 'next'
import { AdvisoryContent } from './advisory-content'

export const metadata: Metadata = {
  title: 'Advisory',
  description:
    'Advisory & fractional leadership. AI transformation, product & tech operating model, platform rebuild, executive mentoring, board-level product strategy.',
}

export default function AdvisoryPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-28 lg:px-8">
      <AdvisoryContent />
    </div>
  )
}
