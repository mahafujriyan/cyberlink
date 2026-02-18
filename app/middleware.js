import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('master_admin_session')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  if (pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: '/admin/:path*', 
};