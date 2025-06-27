"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ThemeManager } from "@/lib/theme-manager"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  themeManager: ThemeManager
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [themeManager] = useState(() => ThemeManager.getInstance())

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    themeManager.initializeTheme()
    setTheme(themeManager.getCurrentTheme().mode as Theme)

    // Subscribe to theme changes
    const handleThemeChange = (newTheme: string) => {
      setTheme(newTheme as Theme)
    }

    themeManager.getCurrentTheme().subscribe(handleThemeChange)

    return () => {
      themeManager.getCurrentTheme().unsubscribe(handleThemeChange)
    }
  }, [themeManager])

  const toggleTheme = () => {
    themeManager.toggleTheme()
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, themeManager }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
