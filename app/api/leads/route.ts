import { NextResponse } from "next/server";
import { leadInputSchema } from "@/lib/lead-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = leadInputSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        error: "GOOGLE_SHEETS_WEBHOOK_URL is not configured on the server."
      },
      { status: 500 }
    );
  }

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString()
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error:
            text || `Google Sheets webhook responded with status ${res.status}`
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/leads] Google Sheets webhook error", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to reach Google Sheets webhook."
      },
      { status: 500 }
    );
  }
}

