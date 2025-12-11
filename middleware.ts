import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;

  console.log('TOKEN FROM MIDDLEWARE ', token);

  const { pathname } = req.nextUrl;

  // Protect dashboard group
  if (pathname.startsWith('/home')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/signup/:path*', '/login/:path*'],
};
