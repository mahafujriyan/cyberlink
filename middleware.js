import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "master_admin_session";

export function middleware(request) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const validSessionToken = process.env.SESSION_TOKEN;
  const isAuthenticated = Boolean(
    session &&
    validSessionToken &&
    session === validSessionToken
  );

  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith("/admin");
  const isPublicAdminPath = pathname === "/admin/login" || pathname === "/admin/register";

  if (isAdminPath && !isPublicAdminPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isPublicAdminPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
