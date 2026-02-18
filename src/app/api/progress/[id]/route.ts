import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { progressLogs } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { progressLogSchema } from "@/lib/validations";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const log = db
    .select()
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.id, parseInt(id)),
        eq(progressLogs.userId, session.userId)
      )
    )
    .get();

  if (!log) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ log });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = progressLogSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .update(progressLogs)
      .set(parsed.data)
      .where(
        and(
          eq(progressLogs.id, parseInt(id)),
          eq(progressLogs.userId, session.userId)
        )
      )
      .returning()
      .get();

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ log: result });
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
    .delete(progressLogs)
    .where(
      and(
        eq(progressLogs.id, parseInt(id)),
        eq(progressLogs.userId, session.userId)
      )
    )
    .returning()
    .get();

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
