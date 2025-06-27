import { User, Vendor, Session, userSchema, vendorSchema, sessionSchema } from "./schema"
import { hash, compare } from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { sign, verify } from "jsonwebtoken"
import { prisma } from "./prisma"

export class UserService {
  private static instance: UserService

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  // Create a new user
  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const hashedPassword = await hash(userData.password, 12)
    const now = new Date()
    const address = userData.address || {}
    const coordinates = (address as any).coordinates || {}
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
        role: userData.role as any,
        phone: userData.phone,
        street: address?.street ?? undefined,
        city: address?.city ?? undefined,
        state: address?.state ?? undefined,
        pincode: address?.pincode ?? undefined,
        country: address?.country ?? undefined,
        landmark: address?.landmark ?? undefined,
        lat: coordinates?.lat ?? undefined,
        lng: coordinates?.lng ?? undefined,
        avatar: userData.avatar,
        verified: false,
        createdAt: now,
        updatedAt: now,
      },
    })
    return user as User
  }

  // Create a new vendor
  async createVendor(vendorData: Omit<Vendor, "id" | "createdAt" | "updatedAt">): Promise<Vendor> {
    const now = new Date()
    const location = vendorData.location || {}
    const coordinates = (location as any).coordinates || {}
    const vendor = await prisma.vendor.create({
      data: {
        userId: vendorData.userId,
        businessName: vendorData.businessName,
        description: vendorData.description,
        logoUrl: vendorData.logoUrl,
        street: location?.street ?? undefined,
        city: location?.city ?? undefined,
        state: location?.state ?? undefined,
        pincode: location?.pincode ?? undefined,
        country: location?.country ?? undefined,
        landmark: location?.landmark ?? undefined,
        lat: coordinates?.lat ?? undefined,
        lng: coordinates?.lng ?? undefined,
        verified: false,
        rating: 0,
        totalOrders: 0,
        gstNumber: vendorData.gstNumber,
        fssaiNumber: vendorData.fssaiNumber,
        createdAt: now,
        updatedAt: now,
      },
    })
    return vendor as Vendor
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user as User || null
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return user as User || null
  }

  // Verify user credentials
  async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)
    if (!user) return null
    const isValid = await compare(password, user.password)
    return isValid ? user : null
  }

  // Create a new session
  async createSession(userId: string): Promise<Session> {
    const now = new Date()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const token = sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })
    const session = await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        createdAt: now,
        updatedAt: now,
      },
    })
    return session as Session
  }

  // Verify session token
  async verifySession(token: string): Promise<User | null> {
    try {
      const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as { userId: string }
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      })
      if (!session || session.expiresAt < new Date()) return null
      return session.user as User
    } catch (error) {
      return null
    }
  }

  // Update user
  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
    return updatedUser as User
  }

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    await prisma.user.delete({ where: { id } })
    return true
  }

  // Delete session
  async deleteSession(token: string): Promise<boolean> {
    await prisma.session.delete({ where: { token } })
    return true
  }
} 