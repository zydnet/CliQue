"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/currency"
import { AuthManager } from "@/lib/user-manager"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CreditCard, Smartphone, Building2, Shield, ArrowLeft, MapPin, Truck, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  processingFee: number
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Pay using Google Pay, PhonePe, Paytm, or any UPI app",
    processingFee: 0,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="w-5 h-5" />,
    description: "Visa, Mastercard, RuPay cards accepted",
    processingFee: 2.5,
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: <Building2 className="w-5 h-5" />,
    description: "All major banks supported",
    processingFee: 0,
  },
]

export default function CheckoutPage() {
  const { items, totalAmount, totalSavings, clearCart } = useCart()
  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [currentUser, setCurrentUser] = useState(AuthManager.getInstance().getCurrentUser())
  const router = useRouter()

  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.fullName || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth?redirectTo=/checkout")
      return
    }
    if (items.length === 0) {
      router.push("/deals")
      return
    }
  }, [currentUser, items, router])

  const selectedMethod = paymentMethods.find((method) => method.id === selectedPayment)
  const processingFee = selectedMethod ? (totalAmount * selectedMethod.processingFee) / 100 : 0
  const finalAmount = totalAmount + processingFee

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Create payment order
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          userId: currentUser?.id,
          items: items.map((item) => ({
            dealId: item.dealId,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress,
          paymentMethod: selectedPayment,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Simulate payment success
        setTimeout(() => {
          setOrderPlaced(true)
          clearCart()
          setLoading(false)
        }, 2000)
      } else {
        throw new Error(result.message || "Payment failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your order. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link href="/deals">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">Continue Shopping</Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full">
                  View Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentUser || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Checkout</h1>
            <p className="text-gray-600 dark:text-gray-400">Review your order and complete payment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress((prev) => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="House/Flat No, Street, Area"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress((prev) => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress((prev) => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress((prev) => ({ ...prev, state: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="560001"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedPayment === method.id
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="text-primary-600"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-primary-600 dark:text-primary-400">{method.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{method.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                          {method.processingFee > 0 && (
                            <div className="text-xs text-orange-600 dark:text-orange-400">
                              Processing fee: {method.processingFee}%
                            </div>
                          )}
                        </div>
                      </div>
                      {method.processingFee === 0 && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        >
                          No Fee
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                  >
                    <Image
                      src={item.image || "/placeholder.svg?height=60&width=60"}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">by {item.vendorName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                      {item.savings && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Saved: {formatCurrency(item.savings * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Free delivery on all group orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Delivery within 3-7 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                {processingFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                    <span className="text-gray-900 dark:text-gray-100">{formatCurrency(processingFee)}</span>
                  </div>
                )}
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">Total Savings</span>
                    <span className="text-green-600 dark:text-green-400">-{formatCurrency(totalSavings)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(finalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 h-12 text-lg text-gray-900 dark:text-white"
              onClick={handlePlaceOrder}
              disabled={loading || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address}
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Place Order - {formatCurrency(finalAmount)}
                </>
              )}
            </Button>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              By placing this order, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
