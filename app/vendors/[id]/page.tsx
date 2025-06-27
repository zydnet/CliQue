"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DealCard } from "@/components/deal-card"
import { Star, MapPin, Verified, Phone, Mail, Globe, TrendingUp, Award, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockVendor = {
  id: "1",
  name: "Coorg Coffee Co.",
  description:
    "Premium coffee roasters since 1995, sourcing directly from Coorg plantations. We specialize in single-origin Arabica beans with traditional roasting methods.",
  location: "Coorg, Karnataka",
  rating: 4.8,
  totalOrders: 156,
  verified: true,
  categories: ["Food & Beverages"],
  image: "/placeholder.svg?height=400&width=600",
  coverImage: "/placeholder.svg?height=300&width=800",
  phone: "+91 98765 43210",
  email: "contact@coorgcoffee.com",
  website: "www.coorgcoffee.com",
  established: "1995",
  certifications: ["Organic India", "Fair Trade", "FSSAI Certified"],
  stats: {
    totalProducts: 25,
    activeDeals: 3,
    successRate: 94,
    responseTime: "2 hours",
  },
}

const mockDeals = [
  {
    id: "1",
    productId: "1",
    creatorId: "1",
    title: "Premium Arabica Coffee Beans - 1kg Pack",
    description: "Freshly roasted premium Arabica coffee beans from Coorg plantations.",
    targetCount: 25,
    currentCount: 18,
    pricePerItem: 899,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    pickupLocation: "Koramangala, Bangalore",
    product: {
      id: "1",
      vendorId: "1",
      name: "Premium Arabica Coffee Beans",
      imageUrls: ["/images/coffee-beans.jpg"],
      basePrice: 1299,
      groupPrice: 899,
      inventoryCount: 100,
      minGroupSize: 15,
      maxGroupSize: 50,
      active: true,
      unit: "kg",
      tags: ["Organic", "Single Origin", "Medium Roast"],
      certifications: ["Organic India", "Fair Trade"],
      vendor: mockVendor,
    },
  },
]

const mockReviews = [
  {
    id: "1",
    customer: "Rajesh Kumar",
    rating: 5,
    comment: "Excellent quality coffee beans! The aroma and taste are exceptional.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: "2",
    customer: "Priya Sharma",
    rating: 4,
    comment: "Good quality products and fast delivery. Will order again.",
    date: "2024-01-08",
    verified: true,
  },
]

export default function VendorStorePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("deals")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary-600 to-purple-600">
        <Image
          src={mockVendor.coverImage || "/placeholder.svg"}
          alt="Store cover"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4">
          <Link href="/vendors" className="flex items-center gap-2 text-white hover:text-gray-200 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vendors</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Vendor Info Card */}
        <Card className="bg-white dark:bg-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={mockVendor.image || "/placeholder.svg"}
                  alt={mockVendor.name}
                  width={150}
                  height={150}
                  className="w-32 h-32 rounded-lg object-cover border-4 border-white dark:border-gray-700"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mockVendor.name}</h1>
                      {mockVendor.verified && (
                        <Badge className="bg-green-500 text-white">
                          <Verified className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{mockVendor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {mockVendor.rating} ({mockVendor.totalOrders} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{mockVendor.description}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{mockVendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{mockVendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>{mockVendor.website}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {mockVendor.stats.totalProducts}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Products</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {mockVendor.stats.activeDeals}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Active Deals</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {mockVendor.stats.successRate}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {mockVendor.stats.responseTime}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deals">Active Deals</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="deals" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>About {mockVendor.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Our Story</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {mockVendor.description} We have been serving coffee lovers for over 25 years, maintaining the
                    highest standards of quality and sustainability.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockVendor.certifications.map((cert) => (
                      <Badge
                        key={cert}
                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Established</h3>
                  <p className="text-gray-700 dark:text-gray-300">{mockVendor.established}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{review.customer}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Verified className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600 dark:text-gray-400">{mockVendor.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600 dark:text-gray-400">{mockVendor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-gray-600 dark:text-gray-400">{mockVendor.website}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600 dark:text-gray-400">{mockVendor.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-gray-600 dark:text-gray-400">{mockVendor.stats.responseTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full md:w-auto">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
