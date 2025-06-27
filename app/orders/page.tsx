"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, CheckCircle, Clock, Search, Eye, Download, Star, MessageCircle, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

const mockOrders = [
  {
    id: "ORD001",
    dealTitle: "Premium Arabica Coffee Beans - 1kg Pack",
    vendor: "Coorg Coffee Co.",
    quantity: 2,
    amount: 1798,
    status: "delivered",
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-15",
    image: "/images/coffee-beans.jpg",
    trackingId: "TRK123456789",
    canReview: true,
    canReturn: true,
  },
  {
    id: "ORD003",
    dealTitle: "Artisan Sourdough Bread - Weekly Subscription",
    vendor: "Bangalore Bakehouse",
    quantity: 4,
    amount: 720,
    status: "processing",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-20",
    image: "/images/sourdough-bread.jpg",
    trackingId: null,
    canReview: false,
    canReturn: false,
  },
  {
    id: "ORD004",
    dealTitle: "Organic Mixed Vegetables Box - 5kg",
    vendor: "Green Valley Farms",
    quantity: 1,
    amount: 350,
    status: "cancelled",
    orderDate: "2024-01-08",
    deliveryDate: null,
    image: "/images/organic-vegetables.jpg",
    trackingId: null,
    canReview: false,
    canReturn: false,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-500"
    case "shipped":
      return "bg-blue-500"
    case "processing":
      return "bg-yellow-500"
    case "cancelled":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return CheckCircle
    case "shipped":
      return Truck
    case "processing":
      return Clock
    case "cancelled":
      return RefreshCw
    default:
      return Package
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.dealTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesTab = activeTab === "all" || order.status === activeTab
    return matchesSearch && matchesStatus && matchesTab
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your group deal orders</p>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredOrders.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No orders found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't placed any orders yet"}
                  </p>
                  <Link href="/deals">
                    <Button>Browse Deals</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <Card key={order.id} className="bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <Image
                              src={order.image || "/placeholder.svg"}
                              alt={order.dealTitle}
                              width={120}
                              height={120}
                              className="w-24 h-24 lg:w-30 lg:h-30 object-cover rounded-lg"
                            />
                          </div>

                          {/* Order Details */}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                                  {order.dealTitle}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">by {order.vendor}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <span>Order ID: {order.id}</span>
                                  <span>Quantity: {order.quantity}</span>
                                  <span>Ordered: {order.orderDate}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                  {formatCurrency(order.amount)}
                                </div>
                                <Badge className={`${getStatusColor(order.status)} text-white`}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                            </div>

                            {/* Status-specific Information */}
                            {order.status === "shipped" && order.trackingId && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <span className="font-medium text-blue-800 dark:text-blue-200">
                                    Your order is on the way!
                                  </span>
                                </div>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  Tracking ID: {order.trackingId}
                                </p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  Expected delivery: {order.deliveryDate}
                                </p>
                              </div>
                            )}

                            {order.status === "delivered" && (
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <span className="font-medium text-green-800 dark:text-green-200">
                                    Delivered successfully!
                                  </span>
                                </div>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                  Delivered on: {order.deliveryDate}
                                </p>
                              </div>
                            )}

                            {order.status === "processing" && (
                              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                                    Order is being processed
                                  </span>
                                </div>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                  Expected to ship by: {order.deliveryDate}
                                </p>
                              </div>
                            )}

                            {order.status === "cancelled" && (
                              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <RefreshCw className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  <span className="font-medium text-red-800 dark:text-red-200">
                                    Order was cancelled
                                  </span>
                                </div>
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  Refund will be processed within 3-5 business days
                                </p>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>

                              {order.trackingId && (
                                <Button variant="outline" size="sm">
                                  <Truck className="w-4 h-4 mr-2" />
                                  Track Order
                                </Button>
                              )}

                              {order.canReview && (
                                <Button variant="outline" size="sm">
                                  <Star className="w-4 h-4 mr-2" />
                                  Write Review
                                </Button>
                              )}

                              {order.canReturn && (
                                <Button variant="outline" size="sm">
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Return Item
                                </Button>
                              )}

                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Contact Vendor
                              </Button>

                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
