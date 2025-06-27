"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function TestApiPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testJoinDeal = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/group-orders/1/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "test-user-123",
          quantity: 2,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to call API" })
    } finally {
      setLoading(false)
    }
  }

  const testGetDeal = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/group-orders/1/join", {
        method: "GET",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to call API" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-500 mb-8">API Testing Page</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Join Deal API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Test the POST /api/group-orders/1/join endpoint</p>
              <Button onClick={testJoinDeal} disabled={loading} className="w-full">
                {loading ? <LoadingSpinner size="sm" /> : "Test Join Deal"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Get Deal API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Test the GET /api/group-orders/1/join endpoint</p>
              <Button onClick={testGetDeal} disabled={loading} className="w-full">
                {loading ? <LoadingSpinner size="sm" /> : "Test Get Deal"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>API Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
