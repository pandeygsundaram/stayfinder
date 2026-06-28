import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const { listingId, rating, comment } = await req.json();

    const existing = await prisma.review.findUnique({
      where: { userId_listingId: { userId: auth.userId, listingId } },
    });
    if (existing) {
      return Response.json({ msg: "You already reviewed this listing" }, { status: 400 });
    }

    const completedBooking = await prisma.booking.findFirst({
      where: {
        userId: auth.userId,
        listingId,
        status: "Approved",
        endDate: { lt: new Date() },
      },
    });
    if (!completedBooking) {
      return Response.json(
        { msg: "You can only review listings you have completed a stay at" },
        { status: 403 }
      );
    }

    const review = await prisma.review.create({
      data: { userId: auth.userId, listingId, rating, comment },
    });

    return Response.json(review, { status: 201 });
  } catch {
    return Response.json({ msg: "Failed to leave review" }, { status: 500 });
  }
}

export async function GET(): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: auth.userId },
      orderBy: { createdAt: "desc" },
      include: {
        listing: { select: { id: true, title: true, location: true } },
      },
    });
    return Response.json(reviews);
  } catch {
    return Response.json({ msg: "Could not get your reviews" }, { status: 500 });
  }
}
