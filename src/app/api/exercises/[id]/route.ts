import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { exercises } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { exerciseSchema } from "@/lib/validations";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const exercise = db
    .select()
    .from(exercises)
    .where(eq(exercises.id, parseInt(id)))
    .get();

  if (!exercise) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ exercise });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = exerciseSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .update(exercises)
      .set(parsed.data)
      .where(
        and(
          eq(exercises.id, parseInt(id)),
          eq(exercises.userId, session.userId)
        )
      )
      .returning()
      .get();

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ exercise: result });
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
    .delete(exercises)
    .where(
      and(eq(exercises.id, parseInt(id)), eq(exercises.userId, session.userId))
    )
    .returning()
    .get();

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
