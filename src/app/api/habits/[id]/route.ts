import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { habits } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { habitSchema } from "@/lib/validations";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const habit = db
    .select()
    .from(habits)
    .where(and(eq(habits.id, parseInt(id)), eq(habits.userId, session.userId)))
    .get();

  if (!habit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ habit });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = habitSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .update(habits)
      .set(parsed.data)
      .where(
        and(eq(habits.id, parseInt(id)), eq(habits.userId, session.userId))
      )
      .returning()
      .get();

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ habit: result });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const result = db
    .delete(habits)
    .where(and(eq(habits.id, parseInt(id)), eq(habits.userId, session.userId)))
    .returning()
    .get();

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
