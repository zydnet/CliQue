"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartIcon() {
  const { totalItems, isAnimating } = useCart()

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <div className="relative">
          <ShoppingCart className={`w-5 h-5 ${isAnimating ? "animate-cart-bounce" : ""}`} />

          {/* Items inside cart - small dots */}
          {totalItems > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-0.5 mt-1">
                {totalItems >= 1 && <div className="w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"></div>}
                {totalItems >= 2 && <div className="w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"></div>}
                {totalItems >= 3 && <div className="w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"></div>}
              </div>
            </div>
          )}
        </div>

        {/* Item count badge */}
        {totalItems > 0 && (
          <div className={`absolute -top-1 -right-1 ${isAnimating ? "animate-cart-shake" : ""}`}>
            <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
              {totalItems > 9 ? "9+" : totalItems}
            </div>
          </div>
        )}
      </Button>
    </Link>
  )
}
