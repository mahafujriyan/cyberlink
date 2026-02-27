import { NextResponse } from "next/server";
import { getContentFileList, readContentByKey } from "@/lib/serverContent";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = String(searchParams.get("key") || "");

    if (!key) {
      return NextResponse.json({ success: true, data: getContentFileList() });
    }

    const data = await readContentByKey(key);
    if (!data) {
      return NextResponse.json({ success: false, error: "Invalid file key." }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
