"use client"

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-provider"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { items, removeFromCart, updateQuantity, totalAmount, totalSavings, isOpen, setIsOpen, clearCart } = useCart()
  const router = useRouter()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your Cart</h2>
            {items.length > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
              >
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add some deals to get started!</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Browse Deals
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-colors duration-200"
                >
                  <div className="flex gap-3">
                    <Image
                      src={item.image || "/placeholder.svg?height=80&width=80"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {item.vendorName}</p>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary-600 dark:text-primary-400">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">per {item.unit}</span>
                      </div>

                      {item.savings && (
                        <div className="text-xs text-green-600 dark:text-green-400 mb-2">
                          Save {formatCurrency(item.savings)} per item
                        </div>
                      )}

                      <div className="flex items-center justify-between">
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
                          <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {item.deliveryDate && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Delivery: {new Date(item.deliveryDate).toLocaleDateString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="w-full text-red-500 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
            {totalSavings > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">
                  Total Savings: {formatCurrency(totalSavings)}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  You're saving money by buying in groups!
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</span>
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <div className="space-y-2">
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-gray-900 dark:text-white">
                  Proceed to Checkout
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={() => router.back()}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
