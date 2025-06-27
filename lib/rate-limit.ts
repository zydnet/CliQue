import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000 // 15 minutes

// In-memory store for rate limiting
const ipRequests = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(request: NextRequest) {
  const ip = request.ip || "anonymous"
  const now = Date.now()

  // Clean up expired entries
  for (const [key, value] of ipRequests.entries()) {
    if (value.resetTime < now) {
      ipRequests.delete(key)
    }
  }

  // Get or create rate limit entry for this IP
  const requestData = ipRequests.get(ip) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW_MS,
  }

  // Increment request count
  requestData.count++
  ipRequests.set(ip, requestData)

  // Check if rate limit exceeded
  if (requestData.count > RATE_LIMIT_MAX) {
    return NextResponse.json(
      {
        error: "Too many requests",
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((requestData.resetTime - now) / 1000).toString(),
        },
      }
    )
  }

  return null
} 