"use client"

import { useEffect, useState } from "react"

export function BackgroundElements() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-purple-300/30 dark:from-secondary-800/20 dark:to-purple-800/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})`,
          opacity: Math.max(0.3, 1 - scrollY * 0.001),
        }}
      />

      <div
        className="absolute -left-32 top-1/4 w-80 h-80 bg-gradient-to-br from-accent-300/25 to-primary-300/25 dark:from-accent-800/15 dark:to-primary-800/15 rounded-full blur-2xl"
        style={{
          transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px) rotate(${scrollY * 0.02}deg)`,
          opacity: Math.max(0.2, 0.8 - scrollY * 0.0008),
        }}
      />

      <div
        className="absolute -bottom-32 -right-32 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-cream-300/40 dark:from-purple-800/25 dark:to-cream-800/25 rounded-full blur-2xl"
        style={{
          transform: `translate(${scrollY * 0.06}px, ${scrollY * -0.04}px) scale(${1 + scrollY * 0.00008})`,
          opacity: Math.max(0.2, 0.7 - scrollY * 0.0006),
        }}
      />

      {/* Floating particles */}
      <div
        className="absolute top-1/3 left-1/4 w-4 h-4 bg-secondary-300/60 dark:bg-secondary-700/40 rounded-full animate-float"
        style={{
          transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)`,
        }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-6 h-6 bg-accent-400/50 dark:bg-accent-700/30 rounded-full animate-float-delayed"
        style={{
          transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300/70 dark:bg-purple-700/40 rounded-full animate-float"
        style={{
          transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.02}px)`,
        }}
      />

      {/* Dynamic curved lines */}
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 dark:opacity-5"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(-50%, -50%) rotate(${scrollY * 0.01}deg) scale(${1 + scrollY * 0.00005})`,
        }}
      >
        <path
          d={`M0 400C300 ${200 + Math.sin(scrollY * 0.01) * 50} 600 ${600 + Math.cos(scrollY * 0.008) * 40} 900 400C1050 300 1150 500 1200 400`}
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M0 300C400 ${500 + Math.sin(scrollY * 0.012) * 30} 800 ${100 + Math.cos(scrollY * 0.01) * 25} 1200 300`}
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#808034" stopOpacity={Math.max(0.3, 0.8 - scrollY * 0.0005)} />
            <stop offset="50%" stopColor="#DBD4FF" stopOpacity={Math.max(0.2, 0.6 - scrollY * 0.0004)} />
            <stop offset="100%" stopColor="#723480" stopOpacity={Math.max(0.3, 0.8 - scrollY * 0.0005)} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFE3" stopOpacity={Math.max(0.2, 0.5 - scrollY * 0.0003)} />
            <stop offset="100%" stopColor="#808034" stopOpacity={Math.max(0.2, 0.5 - scrollY * 0.0003)} />
          </linearGradient>
        </defs>
      </svg>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-50/20 to-secondary-50/20 dark:from-transparent dark:via-primary-950/10 dark:to-secondary-950/10"
        style={{
          transform: `rotate(${scrollY * 0.005}deg) scale(${1 + scrollY * 0.00003})`,
          opacity: Math.max(0.1, 0.4 - scrollY * 0.0002),
        }}
      />
    </div>
  )
}
