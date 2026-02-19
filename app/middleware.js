import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('master_admin_session')?.value;
  const validSessionToken = process.env.SESSION_TOKEN;
  const isAuthenticated = Boolean(
    session &&
    validSessionToken &&
    session === validSessionToken
  );
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: '/admin/:path*', 
};
