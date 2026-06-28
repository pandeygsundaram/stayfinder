import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const listingId = parseInt(id);
  if (isNaN(listingId)) return Response.json({ msg: "Invalid listing ID" }, { status: 400 });

  try {
    const reviews = await prisma.review.findMany({
      where: { listingId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return Response.json(reviews);
  } catch {
    return Response.json({ msg: "Could not fetch reviews" }, { status: 500 });
  }
}
