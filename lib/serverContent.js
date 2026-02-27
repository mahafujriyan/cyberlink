import path from "path";
import { promises as fs } from "fs";
import { CONTENT_FILES, getContentFileByKey } from "@/lib/contentFiles";

function getAbsolutePath(relativePath) {
  return path.join(process.cwd(), relativePath);
}

export async function readContentByKey(key) {
  const file = getContentFileByKey(key);
  if (!file) return null;

  const fullPath = getAbsolutePath(file.relativePath);
  const raw = await fs.readFile(fullPath, "utf8");
  const content = JSON.parse(raw);
  return {
    key: file.key,
    label: file.label,
    path: file.relativePath,
    content,
  };
}

export async function writeContentByKey(key, parsedContent) {
  const file = getContentFileByKey(key);
  if (!file) return false;

  const fullPath = getAbsolutePath(file.relativePath);
  await fs.writeFile(fullPath, `${JSON.stringify(parsedContent, null, 2)}\n`, "utf8");
  return true;
}

export function getContentFileList() {
  return CONTENT_FILES.map(({ key, label, relativePath }) => ({
    key,
    label,
    path: relativePath,
  }));
}
