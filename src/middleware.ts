import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    { path: '/sign-in', whenAuthenticated: 'redirect' },
    { path: '/register', whenAuthenticated: 'redirect' },
    { path: '/create', whenAuthenticated: 'next' },
    { path: '/', whenAuthenticated: 'next' },
] as const

const privateRoutes = [
    { path: '/edit' },
] as const


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const privateRoute = privateRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('token')

    if (!authToken && !privateRoute) {
        return NextResponse.next()
    }

    if (!authToken && privateRoute) {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/'

        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/'

        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && privateRoute) {
        // Validar expiracao jwt
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}