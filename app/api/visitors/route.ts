import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const endpoint = "https://abacus.jasoncameron.dev";
const cookieName = "portfolio_visitor";

export async function GET(request: NextRequest) {
  const counted = request.cookies.has(cookieName);
  const readOnly = counted || process.env.NODE_ENV !== "production";
  const visitorId = counted ? request.cookies.get(cookieName)?.value : crypto.randomUUID();
  try {
    const url = `${endpoint}/${readOnly ? "get" : "hit"}/beingmohamedhafez.com/visitors`;
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error(`Counter returned ${response.status}`);
    const data: unknown = await response.json();
    const value = typeof data === "object" && data !== null && "value" in data ? data.value : null;
    if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Invalid counter value");
    const result = NextResponse.json({ count: value }, { headers: { "Cache-Control": "private, no-store" } });
    if (!readOnly && visitorId) result.cookies.set(cookieName, visitorId, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 31536000 });
    return result;
  } catch {
    return NextResponse.json({ count: null }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
