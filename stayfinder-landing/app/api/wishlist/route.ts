import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: auth.userId },
      include: { listing: { include: { images: true, user: true } } },
    });

    return Response.json(wishlist.map((w) => w.listing));
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
