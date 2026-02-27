import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getSessionFromRequest } from "@/lib/adminAuth";

const DB_NAME = "cluster0";
const ADMIN_COLLECTION = "admins";

function serializeManager(doc) {
  return {
    _id: doc._id.toString(),
    username: doc.username,
    role: doc.role,
    active: doc.active !== false,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
  };
}

export async function GET(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const docs = await db
      .collection(ADMIN_COLLECTION)
      .find({ role: "manager" })
      .sort({ createdAt: -1, _id: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: docs.map(serializeManager) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!username || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Username and password (min 6 chars) are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const admins = db.collection(ADMIN_COLLECTION);

    const existing = await admins.findOne({ username });
    if (existing) {
      return NextResponse.json({ success: false, error: "Username already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await admins.insertOne({
      username,
      password: hashedPassword,
      role: "manager",
      active: true,
      createdAt: new Date(),
      createdBy: session.username,
    });

    const created = await admins.findOne({ _id: result.insertedId });
    return NextResponse.json({ success: true, data: serializeManager(created) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const id = String(body.id || "");
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid manager id." }, { status: 400 });
    }

    const updates = {};
    if (typeof body.active === "boolean") {
      updates.active = body.active;
    }
    if (typeof body.password === "string" && body.password.length >= 6) {
      updates.password = await bcrypt.hash(body.password, 12);
    }
    if (!Object.keys(updates).length) {
      return NextResponse.json({ success: false, error: "Nothing to update." }, { status: 400 });
    }

    updates.updatedAt = new Date();
    updates.updatedBy = session.username;

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(ADMIN_COLLECTION).updateOne(
      { _id: new ObjectId(id), role: "manager" },
      { $set: updates }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ success: false, error: "Manager not found." }, { status: 404 });
    }

    const updated = await db.collection(ADMIN_COLLECTION).findOne({ _id: new ObjectId(id), role: "manager" });
    return NextResponse.json({ success: true, data: serializeManager(updated) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = String(searchParams.get("id") || "");
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid manager id." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const managerId = new ObjectId(id);

    const deleteResult = await db.collection(ADMIN_COLLECTION).deleteOne({ _id: managerId, role: "manager" });
    if (!deleteResult.deletedCount) {
      return NextResponse.json({ success: false, error: "Manager not found." }, { status: 404 });
    }

    await db.collection("connection_requests").updateMany(
      { assignedManagerId: managerId },
      {
        $set: {
          assignedManagerId: null,
          assignedManagerName: "",
          assignmentStatus: "unassigned",
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
