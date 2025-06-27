"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthManager, type BaseUser } from "@/lib/user-manager"

export default function SettingsPage() {
  const [user, setUser] = useState<BaseUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const authManager = AuthManager.getInstance()
    authManager.initializeFromStorage()
    setUser(authManager.getCurrentUser())
  }, [])

  const handleLogout = () => {
    const authManager = AuthManager.getInstance()
    authManager.signOut()
    router.push("/")
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>
        <p className="mb-4">You must be signed in to view your settings.</p>
        <Link href="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>
        <div className="mb-4">
          <div><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</div>
          <div><span className="font-medium">Email:</span> {user.email}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/settings/change-email">
            <Button variant="outline" className="w-full">Change Email</Button>
          </Link>
          <Link href="/settings/change-password">
            <Button variant="outline" className="w-full">Change Password</Button>
          </Link>
          <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>Logout</Button>
        </div>
      </Card>
    </div>
  )
} 