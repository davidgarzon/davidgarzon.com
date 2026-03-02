// In-memory rate limiting (serverless-safe basic protection)
// NOTE: This resets when the serverless instance restarts.

const shortTermStore = new Map<
  string,
  { count: number; resetTime: number }
>()

const dailyStore = new Map<
  string,
  { count: number; date: string }
>()

// Short-term burst limit (e.g. 10 requests per minute)
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = shortTermStore.get(identifier)

  if (!record || now > record.resetTime) {
    shortTermStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })

    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++

  return { allowed: true, remaining: maxRequests - record.count }
}

// Daily limit (e.g. 30 requests per day)
export function checkDailyLimit(
  identifier: string,
  maxDaily: number = 30
): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0]
  const record = dailyStore.get(identifier)

  if (!record || record.date !== today) {
    dailyStore.set(identifier, {
      count: 1,
      date: today,
    })

    return { allowed: true, remaining: maxDaily - 1 }
  }

  if (record.count >= maxDaily) {
    return { allowed: false, remaining: 0 }
  }

  record.count++

  return { allowed: true, remaining: maxDaily - record.count }
}
