"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "./countdown-timer"
import type { GroupOrder } from "@/types"
import { Users, MapPin, Verified, Star, Truck, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency, calculateSavings } from "@/lib/currency"
import { ResponsiveManager } from "@/lib/responsive-manager"
import { useState, useEffect } from "react"

interface DealCardProps {
  deal: GroupOrder
}

export function DealCard({ deal }: DealCardProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("sm")
  const responsiveManager = ResponsiveManager.getInstance()

  useEffect(() => {
    setCurrentBreakpoint(responsiveManager.getCurrentBreakpoint())

    const handleBreakpointChange = (breakpoint: string) => {
      setCurrentBreakpoint(breakpoint)
    }

    responsiveManager.subscribe(handleBreakpointChange)

    return () => {
      responsiveManager.unsubscribe(handleBreakpointChange)
    }
  }, [responsiveManager])

  const progressPercentage = Math.min((deal.currentCount / deal.targetCount) * 100, 100)
  const { savings, percentage } = deal.product
    ? calculateSavings(deal.product.basePrice, deal.pricePerItem)
    : { savings: 0, percentage: 0 }

  const spotsLeft = Math.max(0, deal.targetCount - deal.currentCount)
  const isAlmostFull = spotsLeft <= 3
  const isUrgent = new Date(deal.endDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="relative">
        <Image
          src={deal.product?.imageUrls[0] || "/placeholder.svg?height=200&width=300"}
          alt={deal.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          <Badge className="bg-purple-600 text-white font-semibold text-xs sm:text-sm">Save {percentage}%</Badge>
          {deal.product?.certifications?.includes("Organic India") && (
            <Badge variant="secondary" className="bg-green-500 text-white text-xs">
              🌱 Organic
            </Badge>
          )}
        </div>

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <CountdownTimer endDate={deal.endDate} />
        </div>

        {/* Urgency indicator */}
        {isAlmostFull && (
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
            <Badge className="bg-error-500 text-white animate-pulse text-xs">Only {spotsLeft} spots left!</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-semibold text-sm sm:text-lg line-clamp-2 flex-1 text-gray-900 dark:text-gray-100">
            {deal.title}
          </h3>
          {deal.product?.vendor?.verified && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Verified className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-xs text-primary-600 dark:text-primary-400 hidden sm:inline">Verified</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">{deal.description}</p>

        {/* Vendor info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium truncate">{deal.product?.vendor?.businessName}</span>
            {deal.product?.vendor?.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{deal.product.vendor.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location and delivery */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{deal.pickupLocation}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Free delivery</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              {deal.currentCount} of {deal.targetCount} joined
            </span>
            <span
              className={`text-xs sm:text-sm ${isAlmostFull ? "text-error-500 font-medium" : "text-gray-500 dark:text-gray-400"}`}
            >
              {spotsLeft} spots left
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
            <div
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 animate-progress ${
                progressPercentage >= 80
                  ? "bg-gradient-to-r from-green-500 to-green-600"
                  : "bg-gradient-to-r from-primary-500 to-purple-600"
              }`}
              style={
                {
                  width: `${progressPercentage}%`,
                  "--progress-width": `${progressPercentage}%`,
                } as any
              }
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatCurrency(deal.pricePerItem)}
              </span>
              {deal.product && (
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                  {formatCurrency(deal.product.basePrice)}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              per {deal.product?.unit || "item"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">
              Save {formatCurrency(savings)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{deal.product?.tags?.slice(0, 2).join(", ")}</div>
          </div>
        </div>

        {/* Delivery date */}
        {deal.deliveryDate && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <Shield className="w-3 h-3" />
            <span>Delivery: {new Date(deal.deliveryDate).toLocaleDateString("en-IN")}</span>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/deals/${deal.id}`}>
          <Button
            className={`w-full text-sm sm:text-base ${
              deal.status === "active"
                ? "bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-primary-foreground text-gray-900 dark:text-white"
                : "bg-gray-400 text-gray-100"
            } ${isUrgent && deal.status === "active" ? "animate-pulse" : ""} transition-all duration-200`}
            disabled={deal.status !== "active"}
          >
            <Users className="w-4 h-4 mr-2" />
            {deal.status === "active" ? "Join Deal" : "Deal Ended"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
