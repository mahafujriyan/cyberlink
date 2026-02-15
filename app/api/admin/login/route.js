import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  const masterPassword = process.env.MASTER_ADMIN_PASSWORD;
  const sessionToken = process.env.MASTER_ADMIN_SESSION_TOKEN || "master-admin-active";

  if (!masterPassword) {
    return NextResponse.json(
      { error: "Master admin password is not configured on server." },
      { status: 500 }
    );
  }

  if (password !== masterPassword) {
    return NextResponse.json({ error: "Invalid master admin password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("master_admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
