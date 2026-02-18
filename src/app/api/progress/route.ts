import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { progressLogs } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { progressLogSchema } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = db
    .select()
    .from(progressLogs)
    .where(eq(progressLogs.userId, session.userId))
    .orderBy(desc(progressLogs.date))
    .all();

  return NextResponse.json({ logs: result });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = progressLogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .insert(progressLogs)
      .values({
        ...parsed.data,
        userId: session.userId,
        createdAt: new Date().toISOString(),
      })
      .returning()
      .get();

    return NextResponse.json({ log: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
