import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine") === "true";

    let userId: number | undefined;
    if (mine) {
      const auth = await getAuthUser();
      if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });
      userId = auth.userId;
    }

    const listings = await prisma.listing.findMany({
      where: userId ? { userId } : undefined,
      include: {
        images: true,
        user: { select: { id: true, email: true, name: true } },
        ...(mine ? { bookings: { select: { id: true, startDate: true, endDate: true, status: true } } } : {}),
      },
    });
    return Response.json(listings);
  } catch {
    return Response.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  try {
    const { title, description, price, location, latitude, longitude, images } = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title,
        description: description ?? "No description provided.",
        location: location ?? "Unknown location",
        latitude: latitude ?? 0.0,
        longitude: longitude ?? 0.0,
        price,
        userId: auth.userId,
        images: {
          create: (images ?? []).map((url: string) => ({ url })),
        },
      },
      include: { images: true },
    });

    return Response.json(listing, { status: 201 });
  } catch {
    return Response.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
