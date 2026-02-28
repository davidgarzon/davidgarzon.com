import posthog from 'posthog-js'

export const ANALYTICS_EVENTS = {
  EXPLORE_WORK_CLICKED: 'explore_work_clicked',
  ASK_AGENT_CLICKED: 'ask_agent_clicked',
  PROJECT_CARD_CLICKED: 'project_card_clicked',
  AGENT_QUESTION_SUBMITTED: 'agent_question_submitted',
  AGENT_CHIP_CLICKED: 'agent_chip_clicked',
} as const

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return
  const ph = posthog as unknown as { __loaded?: boolean }
  if (!ph.__loaded) return
  posthog.capture(event, properties)
}
