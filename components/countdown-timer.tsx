"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endDate: string
  className?: string
}

export function CountdownTimer({ endDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isUrgent: boolean
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: false })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        const isUrgent = difference < 24 * 60 * 60 * 1000 // Less than 24 hours

        setTimeLeft({ days, hours, minutes, seconds, isUrgent })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: false })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const formatTime = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h`
    } else if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m`
    } else {
      return `${timeLeft.minutes}m ${timeLeft.seconds}s`
    }
  }

  const bgColor = timeLeft.isUrgent ? "bg-error-500 animate-urgency" : "bg-primary-500"

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium ${bgColor} ${className}`}
    >
      <Clock className="w-3 h-3" />
      <span>{formatTime()}</span>
    </div>
  )
}
