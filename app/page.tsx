"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DealCard } from "@/components/deal-card"
import { BackgroundElements } from "@/components/background-elements"
import {
  ArrowRight, Users, Shield, Star, Truck, Phone, Mail, Github
} from "lucide-react"
import Link from "next/link"
import LandingSection from "./LandingSection"

// 📦 Mock data for featured deals
const featuredDeals = [
  {
    id: "1",
    productId: "1",
    creatorId: "1",
    title: "Premium Arabica Coffee Beans - 1kg Pack",
    description:
      "Freshly roasted premium Arabica coffee beans from Coorg plantations. Direct from farmers to your cup.",
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
      vendor: {
        id: "1",
        userId: "1",
        businessName: "Coorg Coffee Co.",
        verified: true,
        rating: 4.8,
        totalOrders: 156,
      },
    },
  },
  {
    id: "2",
    productId: "2",
    creatorId: "2",
    title: "Artisan Sourdough Bread - Weekly Subscription",
    description: "Handcrafted sourdough bread made with traditional fermentation. Weekly home delivery in Bangalore.",
    targetCount: 20,
    currentCount: 12,
    pricePerItem: 180,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active" as const,
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    pickupLocation: "Indiranagar, Bangalore",
    product: {
      id: "2",
      vendorId: "2",
      name: "Artisan Sourdough Bread",
      imageUrls: ["/images/sourdough-bread.jpg"],
      basePrice: 250,
      groupPrice: 180,
      inventoryCount: 50,
      minGroupSize: 10,
      maxGroupSize: 30,
      active: true,
      unit: "loaf",
      tags: ["Handmade", "No Preservatives", "Whole Wheat"],
      certifications: ["FSSAI Certified"],
      vendor: {
        id: "2",
        userId: "2",
        businessName: "Bangalore Bakehouse",
        verified: true,
        rating: 4.6,
        totalOrders: 89,
      },
    },
  },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const backgroundTransform = (yMult = 0.1, rotateMult = 0.02, opacityFactor = 0.001, minOpacity = 0.3) => ({
    transform: `translateY(${scrollY * yMult}px) rotate(${scrollY * rotateMult}deg)`,
    opacity: Math.max(minOpacity, 1 - scrollY * opacityFactor),
  })

  return (
    <>
      <LandingSection />
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream-300 via-accent-300 to-secondary-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 transition-all duration-1000" style={backgroundTransform()} />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/50 via-transparent to-primary-200/50 dark:from-purple-900/30 dark:to-primary-900/30 transition-all duration-1000" style={backgroundTransform(-0.05, 0, 0.0008, 0.2)} />
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-accent-200/30 to-cream-400/40 dark:from-transparent dark:via-accent-800/20 dark:to-cream-900/20 transition-all duration-1000" style={backgroundTransform(0.08, -0.01, 0.0006, 0.1)} />
        </div>

        <BackgroundElements />

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-secondary-500/10 dark:from-primary-600/20 dark:via-purple-600/20 dark:to-secondary-600/20" style={{ transform: `translateX(${scrollY * 0.1}px)`, opacity: Math.max(0.3, 1 - scrollY * 0.002) }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto transition-all duration-700" style={{ transform: `translateY(${Math.max(0, 40 - scrollY * 0.2)}px)`, opacity: Math.max(0.2, 1 - scrollY * 0.005) }} />
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto transition-all duration-700" style={{ transform: `translateY(${Math.max(0, 50 - scrollY * 0.25)}px)`, opacity: Math.max(0.1, 1 - scrollY * 0.006) }} />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-b from-white to-cream-200 dark:from-gray-900 dark:to-gray-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose CliQue?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Experience the power of collective buying with our innovative platform designed for Indian consumers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Group Power", desc: "Unite with neighbors to unlock wholesale pricing on premium products" },
              { icon: Truck, title: "Local Delivery", desc: "Free delivery to pickup points in your area or doorstep delivery" },
              { icon: Shield, title: "Secure Payments", desc: "UPI, cards, and wallets supported. Money back if deal fails" },
              { icon: Star, title: "Quality Assured", desc: "Verified vendors with ratings and reviews from real customers" }
            ].map(({ icon: Icon, title, desc }, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-800 dark:to-secondary-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Deals */}
        <section className="py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm relative z-10" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">🔥 Trending Deals</h2>
                <p className="text-gray-600 dark:text-gray-400">Join these popular group deals before they expire</p>
              </div>
              <Link href="/deals">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  View All Deals <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
              <a href="tel:+918045678900" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label="Call">
                <Phone className="w-6 h-6" />
              </a>
              <a href="mailto:devanshi.ag1@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://github.com/zydnet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
