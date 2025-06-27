import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserService } from '@/lib/db/user'

// Add paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/deals/create',
  '/deals/edit',
]

// Add paths that should redirect to dashboard if already authenticated
const authPaths = ["/login", "/register"]

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  const { pathname } = request.nextUrl

  // This logic is correct for runtime checks
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))


  if (isProtectedPath) {
    if (!sessionToken) {
      // Redirect to login if no session token
      const url = new URL('/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }

    // Verify session
    const userService = UserService.getInstance()
    const user = await userService.verifySession(sessionToken)

    if (!user) {
      // Clear invalid session and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session_token')
      return response
    }
  }

  if (isAuthPath && sessionToken) {
    // Redirect to dashboard if already authenticated
    const userService = UserService.getInstance()
    const user = await userService.verifySession(sessionToken)

    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    '/dashboard/:path*', // Match dashboard and its sub-routes
    '/profile/:path*',   // Match profile and its sub-routes
    '/deals/:path*',     // Match all deal-related routes
    '/login',
    '/register',
  ],
}
