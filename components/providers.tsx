"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { CartProvider } from "./cart-provider"
import { AuthManager, type BaseUser } from "@/lib/user-manager"

interface AppContextType {
  user: BaseUser | null
  setUser: (user: BaseUser | null) => void
  authManager: AuthManager
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BaseUser | null>(null)
  const [authManager] = useState(() => AuthManager.getInstance())

  useEffect(() => {
    // Initialize auth from storage
    authManager.initializeFromStorage()
    setUser(authManager.getCurrentUser())

    // Subscribe to auth changes
    const handleAuthChange = (newUser: BaseUser | null) => {
      setUser(newUser)
    }

    authManager.subscribe(handleAuthChange)

    return () => {
      authManager.unsubscribe(handleAuthChange)
    }
  }, [authManager])

  return (
    <ThemeProvider>
      <CartProvider>
        <AppContext.Provider value={{ user, setUser, authManager }}>{children}</AppContext.Provider>
      </CartProvider>
    </ThemeProvider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within a Providers component")
  }
  return context
}
