import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // const token = request.cookies.get('refreshToken')?.value;
    // console.log(token);

    // const { pathname } = request.nextUrl;

    // const publicRoutes = ['/login'];
    // const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // if (!token && !isPublicRoute) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // if (token && pathname === '/login') {
    //     return NextResponse.redirect(new URL('/', request.url));
    // } 

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
