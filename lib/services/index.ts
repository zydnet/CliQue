import { Customer, VendorUser, Product, GroupOrderEntity, PaymentEntity } from '@/types/entities'
import { Address, GroupMember } from '@/types'

// Base Service class
export abstract class BaseService<T> {
  protected items: Map<string, T>

  constructor() {
    this.items = new Map()
  }

  protected add(id: string, item: T): void {
    this.items.set(id, item)
  }

  protected get(id: string): T | undefined {
    return this.items.get(id)
  }

  protected getAll(): T[] {
    return Array.from(this.items.values())
  }

  protected remove(id: string): boolean {
    return this.items.delete(id)
  }
}

// User Service
export class UserService extends BaseService<Customer | VendorUser> {
  private static instance: UserService

  private constructor() {
    super()
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  createCustomer(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    verified: boolean = false
  ): Customer {
    const customer = new Customer(id, email, firstName, lastName, verified)
    this.add(id, customer)
    return customer
  }

  createVendor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    businessName: string,
    verified: boolean = false
  ): VendorUser {
    const vendor = new VendorUser(id, email, firstName, lastName, businessName, verified)
    this.add(id, vendor)
    return vendor
  }

  getUser(id: string): Customer | VendorUser | undefined {
    return this.get(id)
  }
}

// Product Service
export class ProductService extends BaseService<Product> {
  private static instance: ProductService

  private constructor() {
    super()
  }

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  createProduct(
    id: string,
    vendorId: string,
    name: string,
    basePrice: number,
    groupPrice: number,
    inventoryCount: number,
    minGroupSize: number,
    maxGroupSize: number,
    unit: string
  ): Product {
    const product = new Product(
      id,
      vendorId,
      name,
      basePrice,
      groupPrice,
      inventoryCount,
      minGroupSize,
      maxGroupSize,
      unit
    )
    this.add(id, product)
    return product
  }

  getProductsByVendor(vendorId: string): Product[] {
    return this.getAll().filter((product) => product.getVendorId() === vendorId)
  }
}

// Group Order Service
export class GroupOrderService extends BaseService<GroupOrderEntity> {
  private static instance: GroupOrderService

  private constructor() {
    super()
  }

  static getInstance(): GroupOrderService {
    if (!GroupOrderService.instance) {
      GroupOrderService.instance = new GroupOrderService()
    }
    return GroupOrderService.instance
  }

  createGroupOrder(
    id: string,
    productId: string,
    creatorId: string,
    title: string,
    targetCount: number,
    pricePerItem: number,
    startDate: string,
    endDate: string
  ): GroupOrderEntity {
    const groupOrder = new GroupOrderEntity(
      id,
      productId,
      creatorId,
      title,
      targetCount,
      pricePerItem,
      startDate,
      endDate
    )
    this.add(id, groupOrder)
    return groupOrder
  }

  addMemberToGroupOrder(groupOrderId: string, member: GroupMember): boolean {
    const groupOrder = this.get(groupOrderId)
    if (!groupOrder) return false

    groupOrder.addMember(member)
    return true
  }

  getActiveGroupOrders(): GroupOrderEntity[] {
    return this.getAll().filter((order) => order.getStatus() === 'active')
  }
}

// Payment Service
export class PaymentService extends BaseService<PaymentEntity> {
  private static instance: PaymentService

  private constructor() {
    super()
  }

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  createPayment(id: string, groupMemberId: string, amount: number): PaymentEntity {
    const payment = new PaymentEntity(id, groupMemberId, amount)
    this.add(id, payment)
    return payment
  }

  capturePayment(id: string, razorpayPaymentId: string): boolean {
    const payment = this.get(id)
    if (!payment) return false

    payment.capturePayment(razorpayPaymentId)
    return true
  }

  getPaymentsByGroupMember(groupMemberId: string): PaymentEntity[] {
    return this.getAll().filter((payment) => payment.getGroupMemberId() === groupMemberId)
  }
} 