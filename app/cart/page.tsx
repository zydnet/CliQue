"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/currency"
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  Clock,
  Star,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalAmount, totalSavings, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Discover amazing group deals and start saving!</p>
            <Link href="/deals">
              <Button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                Browse Deals
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/deals"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
          {items.length > 1 && (
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-500 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white dark:bg-gray-800 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg?height=120&width=120"}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-30 sm:h-30 object-cover rounded-lg flex-shrink-0"
                      />
                      {item.savings && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                          Save {Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 text-lg">
                          {item.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">by</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{item.vendorName}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">4.8</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                              {formatCurrency(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                {formatCurrency(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">per {item.unit}</span>
                        </div>
                        {item.savings && (
                          <div className="text-right">
                            <div className="text-green-600 dark:text-green-400 font-medium">
                              Save {formatCurrency(item.savings)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">per item</div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 py-1 rounded">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                          {item.savings && (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Total saved: {formatCurrency(item.savings * item.quantity)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.pickupLocation}</span>
                          </div>
                          {item.deliveryDate && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Delivery: {new Date(item.deliveryDate).toLocaleDateString("en-IN")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Delivery Benefits */}
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Delivery Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Free delivery on all group orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">100% money back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Delivery within 3-7 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Summary */}
            {totalSavings > 0 && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300 mb-1">
                      {formatCurrency(totalSavings)}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">Total Savings</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      🎉 You're saving money by buying in groups!
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price Breakdown */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">Group Savings</span>
                    <span className="text-green-600 dark:text-green-400">-{formatCurrency(totalSavings)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 h-12 text-lg text-gray-900 dark:text-white">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              Secure checkout powered by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
