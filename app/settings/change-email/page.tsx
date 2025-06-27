"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AuthManager, type BaseUser } from "@/lib/user-manager"
import Link from "next/link"

export default function ChangeEmailPage() {
  const [user, setUser] = useState<BaseUser | null>(null)
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const authManager = AuthManager.getInstance()
    authManager.initializeFromStorage()
    const current = authManager.getCurrentUser()
    setUser(current)
    setEmail(current?.email || "")
  }, [])

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Change Email</h2>
        <p className="mb-4">You must be signed in to change your email.</p>
        <Link href="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("/api/settings/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newEmail: email })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to update email.")
      } else {
        setSuccess(true)
        setError("")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Change Email</h2>
        {success ? (
          <div className="text-green-600 mb-4">Email updated successfully!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Email</label>
              <Input value={user.email} disabled className="mb-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <Input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required disabled={loading} autoComplete="current-password" />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Updating..." : "Update Email"}</Button>
          </form>
        )}
      </Card>
    </div>
  )
} 