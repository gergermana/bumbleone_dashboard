import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    // const publicRoutes = ['/login'];
    // const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // if (!refreshToken && pathname !== '/login') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    if (refreshToken && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    } 

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
