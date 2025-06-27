import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { hash, compare } from "bcryptjs"
import { UserService } from "@/lib/db/user"

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()
    const sessionToken = request.cookies.get("session_token")?.value
    if (!sessionToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const userService = UserService.getInstance()
    const user = await userService.verifySession(sessionToken)
    if (!user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    const isValid = await compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 403 })
    }
    const hashed = await hash(newPassword, 12)
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 