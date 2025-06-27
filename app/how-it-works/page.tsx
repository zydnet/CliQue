"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundElements } from "@/components/background-elements"
import { Users, ShoppingCart, Truck, ArrowRight, Search, CreditCard, Package, Star, Shield, Clock } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "Browse Deals",
    description: "Discover amazing group deals on premium products from verified vendors in your area.",
    details: "Search through hundreds of active deals, filter by category, location, and savings percentage.",
  },
  {
    icon: Users,
    title: "Join a Group",
    description: "Join other buyers to unlock wholesale prices. The more people join, the better the deal gets!",
    details: "Each deal has a minimum group size. Once reached, everyone gets the discounted price.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay securely using UPI, cards, or net banking. Your money is protected until the deal succeeds.",
    details: "We use bank-level security and only charge you when the minimum group size is reached.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Get your products delivered for free to pickup points or directly to your doorstep.",
    details: "Choose from multiple delivery options including home delivery and convenient pickup locations.",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Bank-level security with money-back guarantee if deals don't succeed.",
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "All vendors are verified and products are quality checked before delivery.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick delivery within 3-7 business days with real-time tracking.",
  },
  {
    icon: Package,
    title: "Easy Returns",
    description: "Hassle-free returns and refunds if you're not satisfied with your purchase.",
  },
]

const faqs = [
  {
    question: "What happens if a deal doesn't reach the minimum group size?",
    answer:
      "If a deal doesn't reach the minimum required participants by the deadline, it's cancelled and all payments are automatically refunded within 3-5 business days.",
  },
  {
    question: "How do I know if a vendor is trustworthy?",
    answer:
      "All our vendors go through a strict verification process. Look for the 'Verified' badge, check ratings and reviews from other customers, and view their order history.",
  },
  {
    question: "Can I cancel my order after joining a deal?",
    answer:
      "You can cancel your order before the deal deadline. Once the deal is successful and processing begins, cancellations may not be possible depending on the vendor's policy.",
  },
  {
    question: "How are delivery charges calculated?",
    answer:
      "Most group deals include free delivery. For deals with delivery charges, the cost is clearly mentioned and shared among all participants to keep individual costs low.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BackgroundElements />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How GroupCart Works</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join the group buying revolution and save money on premium products
          </p>
          <Link href="/deals">
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Start Shopping Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Simple Steps to Save Money</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Getting started with group buying is easy. Follow these simple steps to unlock amazing deals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">STEP {index + 1}</div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{step.description}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose CliQue?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to providing the best group buying experience with these key benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-200 to-purple-200 dark:from-secondary-800 dark:to-purple-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Deal Flow */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">See It In Action</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here's how a typical group deal works from start to finish.
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Deal Goes Live</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Premium coffee beans listed at ₹1,299 regular price, ₹899 group price for 25+ buyers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">People Join</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        18 people have joined so far. Only 7 more needed to unlock the deal!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Deal Succeeds</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        25 people joined! Everyone saves ₹400 per kg. Total savings: ₹10,000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Products Delivered</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Free delivery within 5-7 days to pickup points or doorstep 
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-center">Deal Progress</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>18 of 25 joined</span>
                      <span>72% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-green-500 h-3 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹400</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Savings per person</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Got questions? We've got answers to help you get started.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-50 dark:bg-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8">Join thousands of smart shoppers who save money by buying together</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/deals">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Browse Active Deals
                <ShoppingCart className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                Sign Up Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
