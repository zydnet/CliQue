import { NextResponse } from "next/server"
import { UserService } from "@/lib/db/user"

export async function POST(request: Request) {
  try {
    const sessionToken = request.headers.get("cookie")?.split("session_token=")[1]?.split(";")[0]

    if (sessionToken) {
      const userService = UserService.getInstance()
      await userService.deleteSession(sessionToken)
    }

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    )

    // Clear the session cookie
    response.cookies.delete("session_token")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 