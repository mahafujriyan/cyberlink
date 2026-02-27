import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/adminAuth";
import { getContentFileList, readContentByKey, writeContentByKey } from "@/lib/serverContent";

export async function GET(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const key = String(searchParams.get("key") || "");

    if (!key) {
      return NextResponse.json({
        success: true,
        data: getContentFileList(),
      });
    }

    const data = await readContentByKey(key);
    if (!data) {
      return NextResponse.json({ success: false, error: "Invalid file key." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session.isAuthenticated || !session.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const key = String(body.key || "");
    const rawContent = String(body.rawContent || "");

    if (!key || !rawContent) {
      return NextResponse.json({ success: false, error: "key and rawContent are required." }, { status: 400 });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON content." }, { status: 400 });
    }

    const ok = await writeContentByKey(key, parsed);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Invalid file key." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
