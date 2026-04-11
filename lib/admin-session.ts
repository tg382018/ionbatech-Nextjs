import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "ionbatech_admin";

/** saniye — 7 gün */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "dev-only-set-ADMIN_SESSION_SECRET-in-production"
  );
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE;
  const payload = Buffer.from(JSON.stringify({ v: 1 as const, exp }), "utf8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  if (sig.length !== expected.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"))) {
      return false;
    }
  } catch {
    return false;
  }
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const data = JSON.parse(json) as { v?: number; exp?: number };
    if (data.v !== 1 || typeof data.exp !== "number") return false;
    if (data.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAdminSessionValid(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) return false;
  return verifySessionToken(raw);
}
