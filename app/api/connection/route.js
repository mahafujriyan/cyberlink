import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("cluster0");

    const res = await db.collection("connection_requests").insertOne({
      fullName: data.fullName || data.name || "",
      email: data.email || "",
      mobile: data.mobile || data.phone || "",
      phone: data.phone || data.mobile || "",
      location: data.location || data.address || "",
      flatNo: data.flatNo || "",
      houseNo: data.houseNo || "",
      roadNo: data.roadNo || "",
      area: data.area || "",
      landmark: data.landmark || "",
      package: data.package || "",
      nid: data.nid || "",
      latitude: Number.isFinite(Number(data.latitude)) ? Number(data.latitude) : null,
      longitude: Number.isFinite(Number(data.longitude)) ? Number(data.longitude) : null,
      mapLink: data.mapLink || "",
      notes: data.notes || "",
      assignedManagerId: null,
      assignedManagerName: "",
      assignmentStatus: "unassigned",
      status: "pending",
      requestedAt: new Date(),
      updatedAt: new Date(),
      source: "connection-page",
    });

    return NextResponse.json({ success: true, id: res.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
