import { NextResponse } from "next/server"
import { UserService } from "@/lib/db/user"
import { z } from "zod"
import { rateLimit } from "@/lib/rate-limit"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(["user", "vendor"]),
  phone: z.string().optional(),
  businessName: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request as any)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const userService = UserService.getInstance()

    // Check if user already exists
    const existingUser = await userService.findByEmail(validatedData.email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Create user
    const user = await userService.createUser({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: validatedData.role,
      phone: validatedData.phone,
    })

    // Create vendor profile if role is vendor
    if (validatedData.role === "vendor" && validatedData.businessName) {
      await userService.createVendor({
        userId: user.id,
        businessName: validatedData.businessName,
      })
    }

    // Create session
    const session = await userService.createSession(user.id)

    // Set session cookie
    const response = NextResponse.json(
      { message: "Registration successful", user: { ...user, password: undefined } },
      { status: 201 }
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

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 