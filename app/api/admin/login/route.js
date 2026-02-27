import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import {
  ROLE_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
  USERNAME_COOKIE_NAME,
} from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const client = await clientPromise;
    
    const db = client.db("cluster0"); 
    const admin = await db.collection("admins").findOne({ username });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found!" }, { status: 404 });
    }
    if (admin.role === "manager" && admin.active === false) {
      return NextResponse.json({ error: "Manager account is disabled." }, { status: 403 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      role: admin.role || "master_admin",
      username: admin.username,
    });
    
    
    response.cookies.set(SESSION_COOKIE_NAME, process.env.SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });
    response.cookies.set(ROLE_COOKIE_NAME, admin.role || "master_admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set(USER_ID_COOKIE_NAME, admin._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set(USERNAME_COOKIE_NAME, admin.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
