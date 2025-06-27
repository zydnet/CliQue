import { z } from "zod"

// User Schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(), // Will be hashed
  role: z.enum(["customer", "vendor", "admin"]),
  phone: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    country: z.string(),
    landmark: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  avatar: z.string().optional(),
  verified: z.boolean(),
  verificationToken: z.string().optional(),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.string().optional(),
})

// Vendor Schema
export const vendorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  businessName: z.string(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  location: userSchema.shape.address.optional(),
  verified: z.boolean(),
  rating: z.number(),
  totalOrders: z.number(),
  gstNumber: z.string().optional(),
  fssaiNumber: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Session Schema
export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Types
export type User = z.infer<typeof userSchema>
export type Vendor = z.infer<typeof vendorSchema>
export type Session = z.infer<typeof sessionSchema>

// Database Tables
export const tables = {
  users: "users",
  vendors: "vendors",
  sessions: "sessions",
} as const 