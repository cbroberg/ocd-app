import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const COOKIE_NAME = "ocd-session";

export async function verifySessionFromCookie(
  cookieValue: string | undefined
): Promise<{ userId: number; email: string } | null> {
  if (!cookieValue) return null;
  try {
    const { payload } = await jwtVerify(cookieValue, JWT_SECRET);
    return { userId: payload.userId as number, email: payload.email as string };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
