// middleware.ts
import { NextResponse } from 'next/server'
//import type { NextRequest } from 'next/server'

export function middleware(req) {

    const basicAuth = req.headers.get('authorization')
    const url = req.nextUrl

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
        const [user, pwd] = atob(authValue).split(':')

        if (user === 'dreipunkt' && pwd === 'Wurscht?1') {
            return NextResponse.next()
        }
    }
    url.pathname = '/api/basicauth'

    return NextResponse.rewrite(url)
}

export const config = {
    matcher: '/:path*',
}