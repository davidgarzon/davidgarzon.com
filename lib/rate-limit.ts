const rateLimit = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 20,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimit.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}
