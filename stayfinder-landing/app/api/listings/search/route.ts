import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!location || !startDate || !endDate) {
    return Response.json({ msg: "location, startDate and endDate are required" }, { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return Response.json({ msg: "Invalid date format. Use ISO format e.g. 2025-07-01" }, { status: 400 });
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        location: { contains: location.toLowerCase() },
        bookings: {
          none: {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        },
      },
      include: { images: true, user: true },
    });

    return Response.json(listings);
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
