import { Address } from './index'

// Base Entity class with common properties
export abstract class BaseEntity {
  protected id: string
  protected createdAt: string
  protected updatedAt: string

  constructor(id: string) {
    this.id = id
    this.createdAt = new Date().toISOString()
    this.updatedAt = this.createdAt
  }

  getId(): string {
    return this.id
  }

  getCreatedAt(): string {
    return this.createdAt
  }

  getUpdatedAt(): string {
    return this.updatedAt
  }

  protected updateTimestamp(): void {
    this.updatedAt = new Date().toISOString()
  }
}

// Base User class
export abstract class BaseUser extends BaseEntity {
  protected email: string
  protected firstName: string
  protected lastName: string
  protected phone?: string
  protected address?: Address
  protected avatar?: string
  protected verified: boolean

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    verified: boolean = false
  ) {
    super(id)
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.verified = verified
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  getEmail(): string {
    return this.email
  }

  isVerified(): boolean {
    return this.verified
  }

  setAddress(address: Address): void {
    this.address = address
    this.updateTimestamp()
  }

  getAddress(): Address | undefined {
    return this.address
  }
}

// Base Product class
export abstract class BaseProduct extends BaseEntity {
  protected name: string
  protected description?: string
  protected imageUrls: string[]
  protected basePrice: number
  protected groupPrice: number
  protected category?: string
  protected inventoryCount: number
  protected minGroupSize: number
  protected maxGroupSize: number
  protected active: boolean
  protected unit: string
  protected tags: string[]
  protected nutritionInfo?: string
  protected certifications: string[]

  constructor(
    id: string,
    name: string,
    basePrice: number,
    groupPrice: number,
    inventoryCount: number,
    minGroupSize: number,
    maxGroupSize: number,
    unit: string
  ) {
    super(id)
    this.name = name
    this.basePrice = basePrice
    this.groupPrice = groupPrice
    this.inventoryCount = inventoryCount
    this.minGroupSize = minGroupSize
    this.maxGroupSize = maxGroupSize
    this.unit = unit
    this.imageUrls = []
    this.tags = []
    this.certifications = []
    this.active = true
  }

  isActive(): boolean {
    return this.active
  }

  getCurrentPrice(groupSize: number): number {
    return groupSize >= this.minGroupSize ? this.groupPrice : this.basePrice
  }

  updateInventory(count: number): void {
    this.inventoryCount = count
    this.updateTimestamp()
  }

  getInventoryCount(): number {
    return this.inventoryCount
  }
}

// Base Order class
export abstract class BaseOrder extends BaseEntity {
  protected status: string
  protected totalAmount: number
  protected paymentStatus: string

  constructor(id: string, totalAmount: number) {
    super(id)
    this.totalAmount = totalAmount
    this.status = 'pending'
    this.paymentStatus = 'pending'
  }

  getStatus(): string {
    return this.status
  }

  getTotalAmount(): number {
    return this.totalAmount
  }

  getPaymentStatus(): string {
    return this.paymentStatus
  }

  protected updateStatus(status: string): void {
    this.status = status
    this.updateTimestamp()
  }

  protected updatePaymentStatus(status: string): void {
    this.paymentStatus = status
    this.updateTimestamp()
  }
} 