'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (key && host) {
      try {
        posthog.init(key, {
          api_host: host,
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
        })
        setReady(true)
      } catch {
        // No-op: analytics disabled
      }
    }
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST || !ready) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
