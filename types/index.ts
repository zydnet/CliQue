export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "vendor" | "admin"
  phone?: string
  address?: Address
  createdAt: string
  avatar?: string
  verified: boolean
}

export interface Address {
  street: string
  city: string
  state: string
  pincode: string
  country: string
  landmark?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Vendor {
  id: string
  userId: string
  businessName: string
  description?: string
  logoUrl?: string
  location?: Address
  verified: boolean
  rating: number
  totalOrders: number
  gstNumber?: string
  fssaiNumber?: string
}

export interface Product {
  id: string
  vendorId: string
  name: string
  description?: string
  imageUrls: string[]
  basePrice: number
  groupPrice: number
  category?: string
  inventoryCount: number
  minGroupSize: number
  maxGroupSize: number
  active: boolean
  vendor?: Vendor
  unit: string // kg, pieces, liters, etc.
  tags: string[]
  nutritionInfo?: string
  certifications: string[] // Organic, FSSAI, etc.
}

export interface GroupOrder {
  id: string
  productId: string
  creatorId: string
  title: string
  description?: string
  targetCount: number
  currentCount: number
  pricePerItem: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "cancelled" | "expired"
  location?: Address
  product?: Product
  members?: GroupMember[]
  progressPercentage?: number
  timeRemaining?: string
  deliveryDate?: string
  pickupLocation?: string
  shippingCost?: number
}

export interface GroupMember {
  id: string
  groupOrderId: string
  userId: string
  quantity: number
  paymentStatus: "pending" | "authorized" | "captured" | "failed"
  paymentIntentId?: string
  joinedAt: string
  user?: User
}

export interface Payment {
  id: string
  groupMemberId: string
  razorpayPaymentId?: string
  amount: number
  status: string
  createdAt: string
  capturedAt?: string
}
