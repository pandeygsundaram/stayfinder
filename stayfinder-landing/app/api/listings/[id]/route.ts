import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return Response.json({ msg: "Invalid ID" }, { status: 400 });

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: numId },
      include: {
        images: true,
        user: { select: { id: true, name: true, email: true } },
        bookings: { select: { id: true, startDate: true, endDate: true, status: true } },
      },
    });

    if (!listing) return Response.json({ msg: "Listing not found" }, { status: 404 });
    return Response.json(listing);
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
