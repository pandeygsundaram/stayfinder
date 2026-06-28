import { auth } from "@/auth";

export async function getAuthUser(): Promise<{ userId: number; email: string } | null> {
  const session = await auth();
  if (!session?.user?.email) return null;
  const user = session.user as { id?: number; email: string };
  if (!user.id) return null;
  return { userId: user.id, email: user.email };
}
