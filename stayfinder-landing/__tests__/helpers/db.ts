import { PrismaClient } from "@prisma/client";

export const testDb = new PrismaClient({
  datasources: { db: { url: "file:./test.db" } },
});

export async function seedUser(overrides?: Partial<{ email: string; name: string }>) {
  return testDb.user.create({
    data: {
      email: overrides?.email ?? "test@example.com",
      name: overrides?.name ?? "Test User",
    },
  });
}

export async function seedListing(userId: number, overrides?: Partial<{
  title: string; location: string; price: number;
}>) {
  return testDb.listing.create({
    data: {
      title: overrides?.title ?? "Cozy Cabin",
      description: "A nice place",
      location: overrides?.location ?? "Tokyo",
      price: overrides?.price ?? 100,
      latitude: 35.6762,
      longitude: 139.6503,
      userId,
      images: { create: [{ url: "https://example.com/img.jpg" }] },
    },
    include: { images: true },
  });
}

export async function seedBooking(userId: number, listingId: number, overrides?: Partial<{
  startDate: Date; endDate: Date; status: string;
}>) {
  return testDb.booking.create({
    data: {
      userId,
      listingId,
      startDate: overrides?.startDate ?? new Date("2025-08-01"),
      endDate: overrides?.endDate ?? new Date("2025-08-05"),
      status: overrides?.status ?? "Pending",
    },
  });
}

export async function cleanDb() {
  await testDb.review.deleteMany();
  await testDb.wishlist.deleteMany();
  await testDb.booking.deleteMany();
  await testDb.image.deleteMany();
  await testDb.listing.deleteMany();
  await testDb.user.deleteMany();
}
