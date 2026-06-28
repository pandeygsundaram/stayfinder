import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) {
    return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { id: true, email: true, name: true, image: true },
  });

  if (!user) {
    return Response.json({ msg: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}

export async function PATCH(req: NextRequest): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return Response.json({ msg: "Name is required" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: auth.userId },
      data: { name: name.trim() },
      select: { id: true, email: true, name: true, image: true },
    });

    return Response.json(user);
  } catch {
    return Response.json({ msg: "Failed to update profile" }, { status: 500 });
  }
}
