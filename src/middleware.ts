import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get(AUTH_COOKIE)?.value === 'true';

  const isLoginPage = req.nextUrl.pathname === '/admin/login';
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !isLoginPage && !isAuth) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
