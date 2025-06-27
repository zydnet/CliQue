// Base User class
export abstract class BaseUser {
  protected _id: string
  protected _email: string
  protected _firstName: string
  protected _lastName: string
  protected _role: "customer" | "vendor" | "admin"

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: "customer" | "vendor" | "admin" = "customer",
  ) {
    this._id = id
    this._email = email
    this._firstName = firstName
    this._lastName = lastName
    this._role = role
  }

  get id(): string {
    return this._id
  }
  get email(): string {
    return this._email
  }
  get firstName(): string {
    return this._firstName
  }
  get lastName(): string {
    return this._lastName
  }
  get role(): string {
    return this._role
  }
  get fullName(): string {
    return `${this._firstName} ${this._lastName}`
  }

  abstract getPermissions(): string[]
  abstract canAccess(resource: string): boolean
}

// Customer implementation
export class Customer extends BaseUser {
  private _orders: string[] = []
  private _wishlist: string[] = []

  constructor(id: string, email: string, firstName: string, lastName: string) {
    super(id, email, firstName, lastName, "customer")
  }

  getPermissions(): string[] {
    return ["view_deals", "join_deals", "view_profile", "manage_orders"]
  }

  canAccess(resource: string): boolean {
    return this.getPermissions().includes(resource)
  }

  addOrder(orderId: string): void {
    this._orders.push(orderId)
  }

  getOrders(): string[] {
    return [...this._orders]
  }
}

// Vendor implementation
export class Vendor extends BaseUser {
  private _businessName: string
  private _verified = false
  private _products: string[] = []

  constructor(id: string, email: string, firstName: string, lastName: string, businessName: string) {
    super(id, email, firstName, lastName, "vendor")
    this._businessName = businessName
  }

  get businessName(): string {
    return this._businessName
  }
  get verified(): boolean {
    return this._verified
  }

  getPermissions(): string[] {
    return ["view_deals", "create_deals", "manage_products", "view_analytics", "manage_orders"]
  }

  canAccess(resource: string): boolean {
    return this.getPermissions().includes(resource)
  }

  verify(): void {
    this._verified = true
  }

  addProduct(productId: string): void {
    this._products.push(productId)
  }

  getProducts(): string[] {
    return [...this._products]
  }
}

// Authentication Manager using Singleton pattern
export class AuthManager {
  private static instance: AuthManager
  private currentUser: BaseUser | null = null
  private observers: Array<(user: BaseUser | null) => void> = []

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; user?: BaseUser; error?: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in production, this would call your backend
      if (email === "customer@example.com" && password === "password") {
        const user = new Customer("1", email, "John", "Doe")
        this.setCurrentUser(user)
        return { success: true, user }
      } else if (email === "vendor@example.com" && password === "password") {
        const user = new Vendor("2", email, "Jane", "Smith", "Smith's Store")
        this.setCurrentUser(user)
        return { success: true, user }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: "Authentication failed" }
    }
  }

  async signUp(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: "customer" | "vendor"
    businessName?: string
  }): Promise<{ success: boolean; user?: BaseUser; error?: string }> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { email, firstName, lastName, role, businessName } = userData
      const userId = Date.now().toString()

      let user: BaseUser
      if (role === "vendor" && businessName) {
        user = new Vendor(userId, email, firstName, lastName, businessName)
      } else {
        user = new Customer(userId, email, firstName, lastName)
      }

      this.setCurrentUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  signOut(): void {
    this.setCurrentUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  getCurrentUser(): BaseUser | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  private setCurrentUser(user: BaseUser | null): void {
    this.currentUser = user
    this.notifyObservers()

    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            businessName: user instanceof Vendor ? user.businessName : undefined,
          }),
        )
      } else {
        localStorage.removeItem("user")
      }
    }
  }

  subscribe(callback: (user: BaseUser | null) => void): void {
    this.observers.push(callback)
  }

  unsubscribe(callback: (user: BaseUser | null) => void): void {
    this.observers = this.observers.filter((obs) => obs !== callback)
  }

  private notifyObservers(): void {
    this.observers.forEach((callback) => callback(this.currentUser))
  }

  initializeFromStorage(): void {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          let user: BaseUser
          if (userData.role === "vendor") {
            user = new Vendor(userData.id, userData.email, userData.firstName, userData.lastName, userData.businessName)
          } else {
            user = new Customer(userData.id, userData.email, userData.firstName, userData.lastName)
          }
          this.currentUser = user
          this.notifyObservers()
        } catch (error) {
          console.error("Failed to restore user from storage:", error)
        }
      }
    }
  }
}
