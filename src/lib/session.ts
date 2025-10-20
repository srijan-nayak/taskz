"use server";

import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "@/lib/definitions/auth";
import { cookies } from "next/headers";

const SESSION_SECRET = process.env.SESSION_SECRET || "";
const ENCODED_KEY = new TextEncoder().encode(SESSION_SECRET);
const ALGORITHM = "HS256";

export async function generateToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: ALGORITHM,
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_KEY);
}

export async function decryptToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, ENCODED_KEY, {
      algorithms: [ALGORITHM],
    });
    return payload as SessionPayload;
  } catch (err) {
    console.error("Failed to decrypt token", err);
  }

  return null;
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await generateToken({
    userId,
    expiresAt: expiresAt.toString(),
  });
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const token = (await cookies()).get("session")?.value || "";
  return await decryptToken(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
