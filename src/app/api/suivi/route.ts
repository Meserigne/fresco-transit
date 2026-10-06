import { NextResponse } from "next/server";
import { findDossier } from "@/lib/tracking";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = (url.searchParams.get("ref") || url.searchParams.get("suivi") || url.searchParams.get("facture") || "").slice(0, 40);
  if (ref.trim().length < 3) {
    return NextResponse.json({ dossier: null }, { status: 400 });
  }
  const dossier = await findDossier(ref);
  if (!dossier) return NextResponse.json({ dossier: null }, { status: 404 });
  return NextResponse.json({ dossier });
}
