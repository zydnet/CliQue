"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundElements } from "@/components/background-elements"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <BackgroundElements />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">Terms and Conditions</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Last updated: January 15, 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using CliQue, you accept and agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Group Buying Process</h2>
                <p>
                  CliQue facilitates group buying where multiple customers can join together to purchase products at
                  wholesale prices. The following terms apply to all group deals:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Deals have minimum and maximum participant limits</li>
                  <li>Payment is collected when you join a deal</li>
                  <li>If minimum participants are not reached, full refunds are provided</li>
                  <li>Once minimum is reached, the deal becomes binding for all participants</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
                <p>
                  All payments are processed securely through our payment partners. The following payment terms apply:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is required at the time of joining a deal</li>
                  <li>Refunds are processed if deals don't meet minimum requirements</li>
                  <li>Processing fees may apply for certain payment methods</li>
                  <li>All prices are in Indian Rupees (INR)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Vendor Responsibilities</h2>
                <p>Vendors on our platform must adhere to the following standards:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate product descriptions and pricing</li>
                  <li>Fulfill orders within specified timeframes</li>
                  <li>Maintain required business licenses and certifications</li>
                  <li>Respond to customer inquiries promptly</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
                <p>Users agree to use the platform responsibly and not engage in:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fraudulent activities or misrepresentation</li>
                  <li>Harassment of other users or vendors</li>
                  <li>Violation of intellectual property rights</li>
                  <li>Posting false reviews or ratings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p>CliQue acts as a platform connecting buyers and sellers. We are not responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Product quality issues (handled directly with vendors)</li>
                  <li>Delivery delays beyond our control</li>
                  <li>Disputes between users and vendors</li>
                  <li>Third-party payment processing issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                  and protect your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes
                  via email or platform notifications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                <p>For questions about these terms, please contact us at:</p>
                <ul className="list-none space-y-2">
                  <li>Email: legal@groupcart.in</li>
                  <li>Phone: +91 80-4567-8900</li>
                  <li>Address: Bangalore, Karnataka, India</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
