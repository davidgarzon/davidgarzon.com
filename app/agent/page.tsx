import type { Metadata } from 'next'
import { Chat } from '@/components/agent/chat'

export const metadata: Metadata = {
  title: 'Agent',
  description:
    'Ask my AI agent anything about my work, experience, product philosophy, or approach to building AI-native products.',
}

export default function AgentPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <Chat />
    </div>
  )
}
