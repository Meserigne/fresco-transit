import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!allow(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const fields = readFields(body);
  if (!fields) return NextResponse.json({ ok: false }, { status: 400 });
  if (fields.website) return NextResponse.json({ ok: true });

  try {
    const response = await fetch(managerContactUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

function managerContactUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://fresco-transit-manager.onrender.com/espace/api/contact";
  }
  return "http://127.0.0.1:4010/api/contact";
}

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0]?.trim().slice(0, 80) || "inconnu";
}

function readFields(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const name = text(record.name, 80).replace(/\s+/g, " ");
  const company = text(record.company, 80).replace(/\s+/g, " ");
  const email = text(record.email, 120).toLowerCase().replace(/\s+/g, "");
  const phone = text(record.phone, 40).replace(/\s+/g, " ");
  const message = text(record.message, 4000);
  const website = text(record.website, 200);
  if (name.length < 2) return null;
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) return null;
  if (message.length < 10) return null;
  return { name, company, email, phone, message, website };
}

function text(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}
