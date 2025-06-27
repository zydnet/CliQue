"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatCurrency, calculateSavings } from "@/lib/currency"
import {
  Users,
  MapPin,
  Verified,
  Star,
  Truck,
  Shield,
  Phone,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import type { GroupOrder } from "@/types"
import { useCart } from "@/components/cart-provider"
import { AuthManager } from "@/lib/user-manager"

// Mock deal data - in production this would come from API
const mockDeal: GroupOrder = {
  id: "1",
  productId: "1",
  creatorId: "1",
  title: "Premium Arabica Coffee Beans - 1kg Pack",
  description:
    "Freshly roasted premium Arabica coffee beans from Coorg plantations. Direct from farmers to your cup. These beans are carefully selected from high-altitude plantations in Karnataka's coffee country. Each batch is roasted to perfection to bring out the unique flavors and aromas that make Coorg coffee world-renowned.",
  targetCount: 25,
  currentCount: 18,
  pricePerItem: 899,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  status: "active",
  deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  pickupLocation: "Koramangala, Bangalore",
  shippingCost: 0,
  product: {
    id: "1",
    vendorId: "1",
    name: "Premium Arabica Coffee Beans",
    imageUrls: [
      "/images/coffee-beans.jpg",
      "/images/coffee.jpg",
      "/images/coffee1.png",
    ],
    basePrice: 1299,
    groupPrice: 899,
    inventoryCount: 100,
    minGroupSize: 15,
    maxGroupSize: 50,
    active: true,
    unit: "kg",
    tags: ["Organic", "Single Origin", "Medium Roast", "Fair Trade"],
    certifications: ["Organic India", "Fair Trade", "FSSAI Certified"],
    category: "Food & Beverages",
    nutritionInfo: "Rich in antioxidants, low acidity, caffeine content: 95mg per cup",
    vendor: {
      id: "1",
      userId: "1",
      businessName: "Coorg Coffee Co.",
      description: "Premium coffee roasters since 1995, sourcing directly from Coorg plantations",
      verified: true,
      rating: 4.8,
      totalOrders: 156,
      gstNumber: "29ABCDE1234F1Z5",
      fssaiNumber: "12345678901234",
    },
  },
}

export default function DealDetailPage() {
  const params = useParams()
  const [deal, setDeal] = useState<GroupOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showPayment, setShowPayment] = useState(false)

  const { addToCart, setIsOpen: setCartOpen } = useCart()
  const authManager = AuthManager.getInstance()
  const router = useRouter()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDeal(mockDeal)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleJoinDeal = async () => {
    // Check if user is authenticated
    if (!authManager.isAuthenticated()) {
      // Redirect to auth page with return URL
      router.push(`/auth?redirectTo=${encodeURIComponent(`/deals/${params.id}`)}`)
      return
    }

    setJoining(true)
    try {
      const response = await fetch(`/api/group-orders/${params.id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authManager.getCurrentUser()?.id,
          quantity,
        }),
      })

      const result = await response.json()

      if (result.success && deal) {
        // Add to cart with complete product information
        addToCart({
          dealId: deal.id,
          title: deal.title,
          price: deal.pricePerItem,
          quantity,
          image: deal.product?.imageUrls[0] || "",
          vendorName: deal.product?.vendor?.businessName || "",
          unit: deal.product?.unit || "item",
          originalPrice: deal.product?.basePrice,
          savings: deal.product ? deal.product.basePrice - deal.pricePerItem : 0,
          deliveryDate: deal.deliveryDate,
          pickupLocation: deal.pickupLocation,
        })

        // Update deal with new count
        setDeal({
          ...deal,
          currentCount: result.updatedGroupOrder.currentCount,
        })

        // Open cart sidebar to show added item
        setCartOpen(true)
        setShowPayment(true)
      } else {
        alert(result.message || "Failed to join deal")
      }
    } catch (error) {
      console.error("Error joining deal:", error)
      alert("Failed to join deal. Please try again.")
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">Deal not found</h2>
          <Link href="/deals">
            <Button>Browse Other Deals</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { savings, percentage } = deal.product
    ? calculateSavings(deal.product.basePrice, deal.pricePerItem)
    : { savings: 0, percentage: 0 }

  const progressPercentage = Math.min((deal.currentCount / deal.targetCount) * 100, 100)
  const spotsLeft = Math.max(0, deal.targetCount - deal.currentCount)
  const totalAmount = deal.pricePerItem * quantity

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Add vertical space below navbar */}
      <div className="h-4 md:h-8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={deal.product?.imageUrls[selectedImage] || "/placeholder.svg?height=500&width=600"}
                alt={deal.title}
                width={600}
                height={500}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-accent-500 text-white font-semibold">Save {percentage}%</Badge>
                {deal.product?.certifications?.includes("Organic India") && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    🌱 Organic
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <CountdownTimer endDate={deal.endDate} />
              </div>
            </div>

            {/* Thumbnail images */}
            {deal.product?.imageUrls && deal.product.imageUrls.length > 1 && (
              <div className="flex gap-2">
                {deal.product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary-500" : "border-gray-200 dark:border-gray-700"
                    } transition-colors duration-200`}
                  >
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Vendor - now at the top of the right column */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{deal.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {deal.product?.vendor?.businessName}
                  </span>
                  {deal.product?.vendor?.verified && (
                    <div className="flex items-center gap-1">
                      <Verified className="w-4 h-4 text-primary-500" />
                      <span className="text-xs text-primary-500">Verified</span>
                    </div>
                  )}
                </div>
                {deal.product?.vendor?.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{deal.product.vendor.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({deal.product.vendor.totalOrders} orders)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-primary-500 dark:text-primary-400">
                        {formatCurrency(deal.pricePerItem)}
                      </span>
                      {deal.product && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          {formatCurrency(deal.product.basePrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">per {deal.product?.unit || "item"}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent-600 dark:text-accent-400">
                      Save {formatCurrency(savings)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">({percentage}% off)</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {deal.currentCount} of {deal.targetCount} joined
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{spotsLeft} spots left</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="text-gray-900 dark:text-white"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(5, quantity + 1))}
                      disabled={quantity >= 5}
                      className="text-gray-900 dark:text-white"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Total Amount:</span>
                  <span className="text-xl font-bold text-primary-500 dark:text-primary-400">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                {/* Join Button */}
                <Button
                  className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 h-12 text-lg transition-all duration-200 text-gray-900 dark:text-white"
                  onClick={handleJoinDeal}
                  disabled={joining || deal.status !== "active"}
                >
                  {joining ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Users className="w-5 h-5 mr-2" />
                      Join Deal - {formatCurrency(totalAmount)}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pickup: {deal.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Delivery: {deal.deliveryDate ? new Date(deal.deliveryDate).toLocaleDateString("en-IN") : "TBD"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Free shipping • Money back guarantee
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{deal.description}</p>
                {deal.product?.nutritionInfo && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Nutrition Information</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">{deal.product.nutritionInfo}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags and Certifications */}
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Product Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {deal.product?.tags?.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {deal.product?.certifications?.map((cert, index) => (
                        <Badge
                          key={index}
                          className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendor Info */}
          <div>
            <Card className="bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Vendor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{deal.product?.vendor?.businessName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{deal.product?.vendor?.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700 dark:text-gray-300">{deal.product?.vendor?.rating} rating</span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">{deal.product?.vendor?.totalOrders} orders</div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div>GST: {deal.product?.vendor?.gstNumber}</div>
                  <div>FSSAI: {deal.product?.vendor?.fssaiNumber}</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Vendor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Successfully Added to Cart!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                You've successfully added this item to your cart! You can continue shopping or proceed to checkout.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Amount:</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                  onClick={() => {
                    setShowPayment(false)
                    setCartOpen(true)
                  }}
                >
                  View Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
