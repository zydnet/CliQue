"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Verified, Package, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockVendors = [
  {
    id: "1",
    name: "Coorg Coffee Co.",
    description: "Premium coffee roasters since 1995",
    location: "Coorg, Karnataka",
    rating: 4.8,
    totalOrders: 156,
    verified: true,
    categories: ["Food & Beverages"],
    image: "/placeholder.svg?height=200&width=300",
    activeDeals: 3,
  },
  {
    id: "2",
    name: "Bangalore Bakehouse",
    description: "Artisan breads and baked goods",
    location: "Bangalore, Karnataka",
    rating: 4.6,
    totalOrders: 89,
    verified: true,
    categories: ["Food & Beverages"],
    image: "/placeholder.svg?height=200&width=300",
    activeDeals: 2,
  },
  {
    id: "4",
    name: "Green Valley Farms",
    description: "Organic vegetables and fruits",
    location: "Ooty, Tamil Nadu",
    rating: 4.7,
    totalOrders: 312,
    verified: true,
    categories: ["Food & Beverages"],
    image: "/placeholder.svg?height=200&width=300",
    activeDeals: 4,
  },
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const filteredVendors = mockVendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || vendor.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Our Vendors</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover trusted vendors offering quality products</p>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vendors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                  <SelectItem value="Health & Beauty">Health & Beauty</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="deals">Active Deals</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/vendors/register">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">Become a Vendor</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                {vendor.verified && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                    <Verified className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{vendor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{vendor.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{vendor.totalOrders} orders</span>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 font-medium">
                      {vendor.activeDeals} active deals
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
                <Link href={`/vendors/${vendor.id}`}>
                  <Button className="w-full" variant="outline">
                    View Store
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary-600 to-purple-600 text-white mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Want to become a vendor?</h2>
            <p className="mb-6">Join thousands of vendors selling on GroupCart and grow your business</p>
            <Link href="/vendors/register">
              <Button size="lg" variant="secondary">
                Start Selling Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
