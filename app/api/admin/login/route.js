import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const client = await clientPromise;
    
    const db = client.db("cluster0"); 
    const admin = await db.collection("admins").findOne({ username });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found!" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    
    
    response.cookies.set("master_admin_session", process.env.SESSION_TOKEN, {
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