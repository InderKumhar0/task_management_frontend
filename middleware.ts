import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/signup');

  const isProtectedRoute = req.nextUrl.pathname.startsWith('/home');

  if (token && token != 'loggedout' && isAuthPage) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if ((!token || token == 'loggedout') && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/tasks/:path*', '/login', '/signup'],
};
