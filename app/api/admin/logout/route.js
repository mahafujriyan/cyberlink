import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set("master_admin_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
