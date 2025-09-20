import { NextRequest, NextResponse } from 'next/server'
import { authServerApi } from './features/auth/api/authApi';
 
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login']

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (isPublicRoute && accessToken && refreshToken) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    if (isProtectedRoute && !accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (isProtectedRoute && !accessToken && refreshToken) {
        const newTokens = await authServerApi.refresh(refreshToken);

        if (newTokens) {
            response.cookies.set('access_token', newTokens.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "lax",
                maxAge: 15 * 60,
            });

            response.cookies.set('refresh_token', newTokens.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "lax",
                maxAge: 60 * 60 * 24 ,
            });

            return response;
        } else {
            const loginResponse = NextResponse.redirect(new URL('/login', req.url));
            loginResponse.cookies.delete('access_token');
            loginResponse.cookies.delete('refresh_token');
            return loginResponse;
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
