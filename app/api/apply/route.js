import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = "cluster0";
const COLLECTION_NAME = "connection_requests";

function serializeRequest(doc) {
  return {
    ...doc,
    _id: doc._id.toString(),
    requestedAt: doc.requestedAt ? new Date(doc.requestedAt).toISOString() : null,
  };
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const requests = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ requestedAt: -1, _id: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: requests.map(serializeRequest),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const payload = {
      fullName: body.fullName || body.name || "",
      mobile: body.mobile || body.phone || "",
      location: body.location || body.address || "",
      package: body.package || "",
      status: "pending",
      requestedAt: new Date(),
      source: "apply-api",
    };

    const res = await db.collection(COLLECTION_NAME).insertOne(payload);
    return NextResponse.json({ success: true, id: res.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const id = String(body.id || "");
    const status = String(body.status || "").toLowerCase();
    const allowed = new Set(["pending", "reviewed", "approved", "connected", "rejected"]);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Valid request id is required." },
        { status: 400 }
      );
    }

    if (!allowed.has(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { success: false, error: "Request not found." },
        { status: 404 }
      );
    }

    const updated = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Updated request could not be loaded." },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: serializeRequest(updated) });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
