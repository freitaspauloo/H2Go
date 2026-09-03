import { NextResponse } from "next/server";
import { access } from "node:fs/promises";
import path from "node:path";

const VIDEO_DIR = path.join(process.cwd(), "public", "h2go", "video");

/** Reports whether a local background video exists, so the client can prefer it over an embed. */
export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get("name") ?? "";
  const safe = path.basename(name);
  if (!safe || safe !== name || !/\.(mp4|webm)$/i.test(safe)) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }
  try {
    await access(path.join(VIDEO_DIR, safe));
    return NextResponse.json({ exists: true, src: `/h2go/video/${safe}` });
  } catch {
    return NextResponse.json({ exists: false });
  }
}
