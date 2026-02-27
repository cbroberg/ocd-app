import { redirect } from "next/navigation";
import { createHash } from "crypto";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = db
    .select({ name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, session.userId))
    .get();

  if (!user) {
    redirect("/login");
  }

  const emailHash = createHash("md5")
    .update(user.email.toLowerCase().trim())
    .digest("hex");
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=404&s=80`;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName={user.name} gravatarUrl={gravatarUrl} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
