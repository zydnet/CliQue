"use client"
import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import Providers from "@/components/providers"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideNav = pathname === "/auth" || pathname === "/register";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gradient-to-br from-cream-200 via-white to-secondary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-300`}
      >
        <Providers>
          {!hideNav && <Navigation />}
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
