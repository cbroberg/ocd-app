import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createToken, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, name, password } = parsed.data;

    const existing = db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    const result = db
      .insert(users)
      .values({ email, name, passwordHash, createdAt: now, updatedAt: now })
      .returning()
      .get();

    const token = await createToken({ userId: result.id, email: result.email });
    await setSessionCookie(token);

    return NextResponse.json(
      { user: { id: result.id, email: result.email, name: result.name } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
