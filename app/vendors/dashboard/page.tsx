"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Package,
  Users,
  IndianRupee,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

const mockStats = {
  totalRevenue: 125000,
  totalOrders: 89,
  activeDeals: 12,
  rating: 4.8,
  monthlyGrowth: 15.2,
}

const mockDeals = [
  {
    id: "1",
    title: "Premium Coffee Beans",
    status: "active",
    currentOrders: 18,
    targetOrders: 25,
    revenue: 16200,
    endDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Organic Honey",
    status: "completed",
    currentOrders: 30,
    targetOrders: 30,
    revenue: 13500,
    endDate: "2024-01-10",
  },
]

const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    product: "Coffee Beans",
    quantity: 2,
    amount: 1798,
    status: "pending",
    date: "2024-01-12",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    product: "Organic Honey",
    quantity: 1,
    amount: 450,
    status: "shipped",
    date: "2024-01-11",
  },
]

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Vendor Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Coorg Coffee Co.</p>
          </div>
          <Link href="/create-deal">
            <Button className="bg-primary-600 hover:bg-primary-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Deal
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(mockStats.totalRevenue)}
                  </p>
                </div>
                <IndianRupee className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{mockStats.monthlyGrowth}% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockStats.totalOrders}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockStats.activeDeals}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockStats.rating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deals">My Deals</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Deals */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Recent Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDeals.map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{deal.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {deal.currentOrders}/{deal.targetOrders} orders
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={deal.status === "active" ? "default" : "secondary"}>{deal.status}</Badge>
                          <p className="text-sm font-medium">{formatCurrency(deal.revenue)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === "pending" ? "destructive" : "default"}>{order.status}</Badge>
                          <p className="text-sm font-medium">{formatCurrency(order.amount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Deals</CardTitle>
                  <Link href="/create-deal">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Deal
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-6 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{deal.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {deal.currentOrders}/{deal.targetOrders} orders
                          </span>
                          <span>Revenue: {formatCurrency(deal.revenue)}</span>
                          <span>Ends: {deal.endDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={deal.status === "active" ? "default" : "secondary"}>{deal.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{order.id}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Customer: {order.customer}</span>
                          <span>Product: {order.product}</span>
                          <span>Qty: {order.quantity}</span>
                          <span>Date: {order.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(order.amount)}</p>
                          <Badge variant={order.status === "pending" ? "destructive" : "default"}>{order.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed analytics and insights will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
