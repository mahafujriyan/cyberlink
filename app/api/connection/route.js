import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("cluster0");

    const res = await db.collection("connection_requests").insertOne({
      ...data,
      status: "pending",
      requestedAt: new Date(),
    });

    return NextResponse.json({ success: true, id: res.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}