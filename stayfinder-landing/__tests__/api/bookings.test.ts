import { POST, GET } from "@/app/api/bookings/route";
import { cleanDb, seedUser, seedListing, seedBooking, testDb } from "../helpers/db";
import { makeRequest } from "../helpers/auth";

const mockAuth = jest.fn();
jest.mock("@/auth", () => ({ auth: () => mockAuth() }));
jest.mock("@/lib/prisma", () => ({ prisma: require("../helpers/db").testDb }));

beforeEach(async () => { await cleanDb(); });
afterAll(async () => { await testDb.$disconnect(); });

describe("POST /api/bookings", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await POST(makeRequest("/api/bookings", {
      method: "POST",
      json: { listingId: 1, startDate: "2026-09-01", endDate: "2026-09-05" },
    }));
    expect(res.status).toBe(401);
  });

  it("creates a booking successfully", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await POST(makeRequest("/api/bookings", {
      method: "POST",
      json: { listingId: listing.id, startDate: "2026-10-01", endDate: "2026-10-05" },
    }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.listingId).toBe(listing.id);
    expect(data.userId).toBe(user.id);
    expect(data.status).toBe("Pending");
  });

  it("returns 409 on date conflict", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-05"),
    });

    const res = await POST(makeRequest("/api/bookings", {
      method: "POST",
      json: { listingId: listing.id, startDate: "2026-10-03", endDate: "2026-10-07" },
    }));
    expect(res.status).toBe(409);
  });

  it("allows booking when dates do not overlap", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-05"),
    });

    const res = await POST(makeRequest("/api/bookings", {
      method: "POST",
      json: { listingId: listing.id, startDate: "2026-10-06", endDate: "2026-10-10" },
    }));
    expect(res.status).toBe(201);
  });
});

describe("GET /api/bookings", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns user's bookings with listing info", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id);

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].listing.title).toBe("Cozy Cabin");
    expect(data[0].listing.images).toBeDefined();
  });

  it("returns only current user bookings, not others", async () => {
    const user1 = await seedUser({ email: "user1@example.com" });
    const user2 = await seedUser({ email: "user2@example.com" });
    const listing = await seedListing(user1.id);
    mockAuth.mockResolvedValue({ user: { id: user1.id, email: user1.email } });
    await seedBooking(user2.id, listing.id);

    const res = await GET();
    const data = await res.json();
    expect(data).toHaveLength(0);
  });
});
