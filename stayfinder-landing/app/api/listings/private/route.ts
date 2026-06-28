import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const [listings, wishlistItems] = await Promise.all([
      prisma.listing.findMany({
        include: {
          images: true,
          user: { select: { id: true, email: true } },
        },
      }),
      prisma.wishlist.findMany({
        where: { userId: auth.userId },
        select: { listingId: true },
      }),
    ]);

    const wishlisted = new Set(wishlistItems.map((w) => w.listingId));
    const enriched = listings.map((l) => ({ ...l, isWishlisted: wishlisted.has(l.id) }));

    return Response.json(enriched);
  } catch {
    return Response.json({ msg: "Internal server error" }, { status: 500 });
  }
}
