import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// NextAuth v5 auth() can wrap a proxy handler directly
export const proxy = auth((req: NextRequest & { auth?: unknown }) => {
  const session = (req as { auth?: { user?: unknown } }).auth
  const isLoggedIn = !!session?.user
  const pathname = req.nextUrl.pathname
  const isDashboard = pathname.startsWith('/dashboard')
  const isLoginPage = pathname === '/login'

  if (isDashboard && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
}
