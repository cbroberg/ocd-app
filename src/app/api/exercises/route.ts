import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { exercises } from "@/drizzle/schema";
import { eq, or, isNull } from "drizzle-orm";
import { exerciseSchema } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = db
    .select()
    .from(exercises)
    .where(
      or(
        eq(exercises.isSystemExercise, true),
        eq(exercises.userId, session.userId),
        isNull(exercises.userId)
      )
    )
    .all();

  return NextResponse.json({ exercises: result });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = exerciseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .insert(exercises)
      .values({
        ...parsed.data,
        userId: session.userId,
        isSystemExercise: false,
        createdAt: new Date().toISOString(),
      })
      .returning()
      .get();

    return NextResponse.json({ exercise: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
