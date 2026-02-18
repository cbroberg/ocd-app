import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { symptoms } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { symptomSchema } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = db
    .select()
    .from(symptoms)
    .where(eq(symptoms.userId, session.userId))
    .orderBy(desc(symptoms.date))
    .all();

  return NextResponse.json({ symptoms: result });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = symptomSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = db
      .insert(symptoms)
      .values({
        ...parsed.data,
        userId: session.userId,
        createdAt: new Date().toISOString(),
      })
      .returning()
      .get();

    return NextResponse.json({ symptom: result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
