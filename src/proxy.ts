import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.delete("x-fresco-client-ip");
  headers.delete("x-fresco-country");
  headers.delete("x-fresco-city");
  headers.delete("x-fresco-timezone");

  const ip = clientIp(request);
  const country = (request.headers.get("x-vercel-ip-country") || "").trim();
  const city = (request.headers.get("x-vercel-ip-city") || "").trim();
  const zone = (request.headers.get("x-vercel-ip-timezone") || "").trim();
  if (ip) headers.set("x-fresco-client-ip", ip);
  if (/^[A-Za-z]{2}$/.test(country)) headers.set("x-fresco-country", country.toUpperCase());
  if (city) headers.set("x-fresco-city", city.slice(0, 80));
  if (/^[A-Za-z0-9_+/-]{1,64}$/.test(zone)) headers.set("x-fresco-timezone", zone);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/espace", "/espace/:path*"],
};

function clientIp(request: NextRequest) {
  const values = [
    request.headers.get("x-vercel-forwarded-for") || "",
    ...(request.headers.get("x-forwarded-for") || "").split(","),
    request.headers.get("x-real-ip") || "",
  ];
  return values.map((value) => value.trim()).find(isPublicIp) || "";
}

function isPublicIp(ip: string) {
  if (!ip || ip.length > 45) return false;
  const value = ip.toLowerCase();
  if (value.includes(":")) {
    return value !== "::1" && !value.startsWith("fe80:") && !value.startsWith("fc") && !value.startsWith("fd");
  }
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(value)) return false;
  if (value.startsWith("10.") || value.startsWith("127.") || value.startsWith("0.") || value.startsWith("192.168.")) return false;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(value)) return false;
  return value.split(".").every((part) => Number(part) <= 255);
}
