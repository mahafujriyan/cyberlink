import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const FILE_PATH = path.join(process.cwd(), "app", "data", "packagesData.json");

export async function GET() {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
