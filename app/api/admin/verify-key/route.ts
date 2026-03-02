import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const key = typeof json?.key === "string" ? json.key : "";
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return NextResponse.json(
      { ok: false, reason: "no-admin-key-configured" },
      { status: 400 }
    );
  }

  if (key !== adminKey) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

