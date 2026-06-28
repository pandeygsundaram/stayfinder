import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const listingId = parseInt(id);
  if (isNaN(listingId)) return Response.json({ msg: "Invalid ID" }, { status: 400 });

  const item = await prisma.wishlist.findFirst({
    where: { userId: auth.userId, listingId },
  });

  return Response.json({ isWishlisted: !!item });
}

export async function POST(_req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const listingId = parseInt(id);
  if (isNaN(listingId)) return Response.json({ msg: "Invalid ID" }, { status: 400 });

  try {
    const existing = await prisma.wishlist.findUnique({
      where: { userId_listingId: { userId: auth.userId, listingId } },
    });
    if (existing) return Response.json({ msg: "Already wishlisted." }, { status: 400 });

    const item = await prisma.wishlist.create({
      data: { userId: auth.userId, listingId },
    });
    return Response.json(item, { status: 201 });
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Params }): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const listingId = parseInt(id);
  if (isNaN(listingId)) return Response.json({ msg: "Invalid ID" }, { status: 400 });

  try {
    await prisma.wishlist.delete({
      where: { userId_listingId: { userId: auth.userId, listingId } },
    });
    return Response.json({ msg: "Removed from wishlist." });
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
