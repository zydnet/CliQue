export const ROUTES = {
  // Public routes
  HOME: '/',
  HOW_IT_WORKS: '/how-it-works',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  
  // Auth routes
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Vendor routes
  VENDOR_DASHBOARD: '/vendors/dashboard',
  VENDOR_PRODUCTS: '/vendors/products',
  VENDOR_ORDERS: '/vendors/orders',
  VENDOR_PROFILE: '/vendors/profile',
  VENDOR_SETTINGS: '/vendors/settings',
  
  // Customer routes
  CUSTOMER_DASHBOARD: '/dashboard',
  CUSTOMER_ORDERS: '/orders',
  CUSTOMER_PROFILE: '/profile',
  CUSTOMER_SETTINGS: '/settings',
  
  // Deal routes
  DEALS: '/deals',
  DEAL_DETAILS: (id: string) => `/deals/${id}`,
  CREATE_DEAL: '/create-deal',
  EDIT_DEAL: (id: string) => `/deals/${id}/edit`,
  
  // Cart and checkout routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT_SUCCESS: '/checkout/success',
  PAYMENT_FAILURE: '/checkout/failure',
  
  // API routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
    },
    VENDORS: {
      LIST: '/api/vendors',
      DETAILS: (id: string) => `/api/vendors/${id}`,
      PRODUCTS: (id: string) => `/api/vendors/${id}/products`,
      ORDERS: (id: string) => `/api/vendors/${id}/orders`,
    },
    PRODUCTS: {
      LIST: '/api/products',
      DETAILS: (id: string) => `/api/products/${id}`,
      CREATE: '/api/products',
      UPDATE: (id: string) => `/api/products/${id}`,
      DELETE: (id: string) => `/api/products/${id}`,
    },
    ORDERS: {
      LIST: '/api/orders',
      DETAILS: (id: string) => `/api/orders/${id}`,
      CREATE: '/api/orders',
      UPDATE: (id: string) => `/api/orders/${id}`,
      CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    },
    PAYMENTS: {
      CREATE: '/api/payments',
      VERIFY: (id: string) => `/api/payments/${id}/verify`,
      REFUND: (id: string) => `/api/payments/${id}/refund`,
    },
  },
} as const

// Type for route parameters
export type RouteParams = {
  [K in keyof typeof ROUTES]: typeof ROUTES[K] extends (id: string) => string
    ? { id: string }
    : never
}

// Helper function to generate route with parameters
export function generateRoute<T extends keyof typeof ROUTES>(
  route: T,
  params?: RouteParams[T]
): string {
  if (typeof ROUTES[route] === 'function' && params) {
    return (ROUTES[route] as (id: string) => string)(params.id)
  }
  return ROUTES[route] as string
}

// Navigation guard types
export type NavigationGuard = {
  path: string
  requiresAuth: boolean
  requiredRole?: 'customer' | 'vendor' | 'admin'
}

// Navigation guards for protected routes
export const NAVIGATION_GUARDS: Record<string, NavigationGuard> = {
  [ROUTES.VENDOR_DASHBOARD]: {
    path: ROUTES.VENDOR_DASHBOARD,
    requiresAuth: true,
    requiredRole: 'vendor',
  },
  [ROUTES.CUSTOMER_DASHBOARD]: {
    path: ROUTES.CUSTOMER_DASHBOARD,
    requiresAuth: true,
    requiredRole: 'customer',
  },
  [ROUTES.CREATE_DEAL]: {
    path: ROUTES.CREATE_DEAL,
    requiresAuth: true,
    requiredRole: 'vendor',
  },
  [ROUTES.CHECKOUT]: {
    path: ROUTES.CHECKOUT,
    requiresAuth: true,
  },
} 