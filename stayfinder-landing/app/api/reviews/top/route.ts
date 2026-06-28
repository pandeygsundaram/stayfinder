import { prisma } from "@/lib/prisma";

export async function GET(): Promise<Response> {
  try {
    const reviews = await prisma.review.findMany({
      where: { rating: { gte: 4 }, comment: { not: null } },
      orderBy: { rating: "desc" },
      take: 3,
      include: {
        user: { select: { name: true, image: true } },
        listing: { select: { location: true } },
      },
    });
    return Response.json(reviews);
  } catch {
    return Response.json([], { status: 200 });
  }
}
