import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "master_admin_session";
const ROLE_COOKIE_NAME = "admin_role";
const ADMIN_ROLE = "master_admin";
const MANAGER_ROLE = "manager";

export function middleware(request) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const role = request.cookies.get(ROLE_COOKIE_NAME)?.value;
  const validSessionToken = process.env.SESSION_TOKEN;
  const isAuthenticated = Boolean(
    session &&
    validSessionToken &&
    session === validSessionToken &&
    role
  );

  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith("/admin");
  const isPublicAdminPath = pathname === "/admin/login" || pathname === "/admin/register";
  const isAdminDashboardPath = pathname.startsWith("/admin/dashboard");
  const isManagerDashboardPath = pathname.startsWith("/admin/manager-dashboard");

  if (isAdminPath && !isPublicAdminPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAuthenticated && isAdminDashboardPath && role !== ADMIN_ROLE) {
    return NextResponse.redirect(new URL("/admin/manager-dashboard", request.url));
  }

  if (isAuthenticated && isManagerDashboardPath && role !== MANAGER_ROLE) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isPublicAdminPath && isAuthenticated) {
    const target = role === MANAGER_ROLE ? "/admin/manager-dashboard" : "/admin/dashboard";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
