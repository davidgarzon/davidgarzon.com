import type { Metadata } from 'next'
import { Chat } from '@/components/agent/chat'

export const metadata: Metadata = {
  title: 'Agent',
  description:
    'Ask my AI agent anything about my work, experience, product philosophy, or approach to building AI-native products.',
}

export default function AgentPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-[1200px] w-full px-6 pt-28 pb-2 lg:px-8 shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">Ask me anything</h1>
        <p className="max-w-2xl text-lg text-gray-500">
          Ask my AI agent anything about my work, experience, product philosophy, or approach to building AI-native products.
        </p>
      </div>
      <div className="flex-1 min-h-0 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl h-full">
          <Chat />
        </div>
      </div>
    </div>
  )
}
