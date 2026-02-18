import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username, password, secretKey } = await request.json();


    if (secretKey !== process.env.ADMIN_CREATION_SECRET) {
      return NextResponse.json({ error: "ভুল সিক্রেট কি!" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db("cluster0"); 
    const admins = db.collection("admins");

    
    const existingAdmin = await admins.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json({ error: "এই নামে অ্যাডমিন অলরেডি আছে!" }, { status: 400 });
    }

    // পাসওয়ার্ড লক করা (Hashing)
    const hashedPassword = await bcrypt.hash(password, 12);

    await admins.insertOne({
      username,
      password: hashedPassword,
      role: "master_admin",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "অ্যাডমিন ডেটাবেসে সেভ হয়েছে!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}