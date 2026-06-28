import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const { listingId, startDate, endDate } = await req.json();

    const conflict = await prisma.booking.findFirst({
      where: {
        listingId,
        startDate: { lte: new Date(endDate) },
        endDate: { gte: new Date(startDate) },
      },
    });

    if (conflict) {
      return Response.json(
        { msg: "This listing is already booked for those dates." },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        listingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: auth.userId,
      },
      include: { listing: true },
    });

    return Response.json(booking, { status: 201 });
  } catch {
    return Response.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function GET(): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: auth.userId },
      include: { listing: { include: { images: true } } },
      orderBy: { startDate: "desc" },
    });

    return Response.json(bookings);
  } catch {
    return Response.json({ msg: "Internal server error" }, { status: 500 });
  }
}
