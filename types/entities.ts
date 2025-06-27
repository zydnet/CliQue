import { BaseEntity, BaseUser, BaseProduct, BaseOrder } from './base'
import { Address, Vendor, GroupOrder, GroupMember, Payment } from './index'

// Concrete User class
export class Customer extends BaseUser {
  private role: 'customer' = 'customer'

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    verified: boolean = false
  ) {
    super(id, email, firstName, lastName, verified)
  }

  getRole(): string {
    return this.role
  }
}

// Concrete Vendor class
export class VendorUser extends BaseUser {
  private role: 'vendor' = 'vendor'
  private businessName: string
  private description?: string
  private logoUrl?: string
  private location?: Address
  private rating: number
  private totalOrders: number
  private gstNumber?: string
  private fssaiNumber?: string

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    businessName: string,
    verified: boolean = false
  ) {
    super(id, email, firstName, lastName, verified)
    this.businessName = businessName
    this.rating = 0
    this.totalOrders = 0
  }

  getRole(): string {
    return this.role
  }

  getBusinessName(): string {
    return this.businessName
  }

  updateBusinessDetails(details: Partial<Vendor>): void {
    Object.assign(this, details)
    this.updateTimestamp()
  }
}

// Concrete Product class
export class Product extends BaseProduct {
  private vendorId: string
  private vendor?: Vendor

  constructor(
    id: string,
    vendorId: string,
    name: string,
    basePrice: number,
    groupPrice: number,
    inventoryCount: number,
    minGroupSize: number,
    maxGroupSize: number,
    unit: string
  ) {
    super(id, name, basePrice, groupPrice, inventoryCount, minGroupSize, maxGroupSize, unit)
    this.vendorId = vendorId
  }

  getVendorId(): string {
    return this.vendorId
  }

  setVendor(vendor: Vendor): void {
    this.vendor = vendor
    this.updateTimestamp()
  }

  getVendor(): Vendor | undefined {
    return this.vendor
  }
}

// Concrete GroupOrder class
export class GroupOrderEntity extends BaseOrder {
  private productId: string
  private creatorId: string
  private title: string
  private description?: string
  private targetCount: number
  private currentCount: number
  private pricePerItem: number
  private startDate: string
  private endDate: string
  private location?: Address
  private product?: Product
  private members?: GroupMember[]
  private progressPercentage?: number
  private timeRemaining?: string
  private deliveryDate?: string
  private pickupLocation?: string
  private shippingCost?: number

  constructor(
    id: string,
    productId: string,
    creatorId: string,
    title: string,
    targetCount: number,
    pricePerItem: number,
    startDate: string,
    endDate: string
  ) {
    super(id, targetCount * pricePerItem)
    this.productId = productId
    this.creatorId = creatorId
    this.title = title
    this.targetCount = targetCount
    this.currentCount = 0
    this.pricePerItem = pricePerItem
    this.startDate = startDate
    this.endDate = endDate
  }

  addMember(member: GroupMember): void {
    if (!this.members) {
      this.members = []
    }
    this.members.push(member)
    this.currentCount += member.quantity
    this.updateProgress()
    this.updateTimestamp()
  }

  private updateProgress(): void {
    this.progressPercentage = (this.currentCount / this.targetCount) * 100
  }

  getProgress(): number {
    return this.progressPercentage || 0
  }

  isComplete(): boolean {
    return this.currentCount >= this.targetCount
  }
}

// Concrete Payment class
export class PaymentEntity extends BaseEntity {
  private groupMemberId: string
  private razorpayPaymentId?: string
  private amount: number
  private status: string
  private capturedAt?: string

  constructor(id: string, groupMemberId: string, amount: number) {
    super(id)
    this.groupMemberId = groupMemberId
    this.amount = amount
    this.status = 'pending'
  }

  getAmount(): number {
    return this.amount
  }

  getStatus(): string {
    return this.status
  }

  capturePayment(razorpayPaymentId: string): void {
    this.razorpayPaymentId = razorpayPaymentId
    this.status = 'captured'
    this.capturedAt = new Date().toISOString()
    this.updateTimestamp()
  }
} 