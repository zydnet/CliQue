import { NextResponse } from "next/server"
import { UserService } from "@/lib/db/user"
import { z } from "zod"
import { rateLimit } from "@/lib/rate-limit"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request as any)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    const userService = UserService.getInstance()

    // Verify credentials
    const user = await userService.verifyCredentials(
      validatedData.email,
      validatedData.password
    )

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Create session
    const session = await userService.createSession(user.id)

    // Set session cookie
    const response = NextResponse.json(
      { message: "Login successful", user: { ...user, password: undefined } },
      { status: 200 }
    )

    response.cookies.set("session_token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 