import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { habits } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { habitSchema } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = db
    .select()
    .from(habits)
    .where(eq(habits.userId, session.userId))
    .all();

  return NextResponse.json({ habits: result });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = habitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .insert(habits)
      .values({
        ...parsed.data,
        userId: session.userId,
        createdAt: new Date().toISOString(),
      })
      .returning()
      .get();

    return NextResponse.json({ habit: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
