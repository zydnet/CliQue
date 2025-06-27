"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  dealId: string
  title: string
  price: number
  quantity: number
  image: string
  vendorName: string
  unit: string
  originalPrice?: number
  savings?: number
  deliveryDate?: string
  pickupLocation?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
  totalSavings: number
  isAnimating: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to load cart from storage:", error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = (item: Omit<CartItem, "id">) => {
    const id = `${item.dealId}-${Date.now()}`
    const newItem: CartItem = { ...item, id }

    // Check if item already exists
    const existingItemIndex = items.findIndex((cartItem) => cartItem.dealId === item.dealId)

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      setItems((prev) =>
        prev.map((cartItem, index) =>
          index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
        ),
      )
    } else {
      // Add new item
      setItems((prev) => [...prev, newItem])
    }

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)

    // Redirect to cart page instead of opening sidebar
    if (typeof window !== "undefined") {
      window.location.href = "/cart"
    }
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        totalSavings,
        isAnimating,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
