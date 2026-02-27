import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/lib/adminAuth";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));

  clearSessionCookies(response);

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
