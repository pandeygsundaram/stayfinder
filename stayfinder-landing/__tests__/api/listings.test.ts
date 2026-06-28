import { GET, POST } from "@/app/api/listings/route";
import { GET as getById } from "@/app/api/listings/[id]/route";
import { GET as getPrivate } from "@/app/api/listings/private/route";
import { GET as searchListings } from "@/app/api/listings/search/route";
import { cleanDb, seedUser, seedListing, seedBooking, testDb } from "../helpers/db";
import { makeRequest } from "../helpers/auth";

const mockAuth = jest.fn();
jest.mock("@/auth", () => ({ auth: () => mockAuth() }));
jest.mock("@/lib/prisma", () => ({ prisma: require("../helpers/db").testDb }));

beforeEach(async () => { await cleanDb(); });
afterAll(async () => { await testDb.$disconnect(); });

describe("GET /api/listings", () => {
  it("returns empty array when no listings", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual([]);
  });

  it("returns all listings with images and user", async () => {
    const user = await seedUser();
    await seedListing(user.id);

    const res = await GET();
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Cozy Cabin");
    expect(data[0].images).toBeDefined();
    expect(data[0].user.email).toBe("test@example.com");
  });
});

describe("POST /api/listings", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await POST(makeRequest("/api/listings", {
      method: "POST",
      json: { title: "Test", price: 50, location: "Paris" },
    }));
    expect(res.status).toBe(401);
  });

  it("creates a listing when authenticated", async () => {
    const user = await seedUser();
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await POST(makeRequest("/api/listings", {
      method: "POST",
      json: {
        title: "Beach House",
        description: "Lovely",
        price: 200,
        location: "Malibu",
        latitude: 34.0,
        longitude: -118.8,
        images: ["https://example.com/beach.jpg"],
      },
    }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.title).toBe("Beach House");
    expect(data.images).toHaveLength(1);
    expect(data.userId).toBe(user.id);
  });
});

describe("GET /api/listings/[id]", () => {
  it("returns 400 for non-numeric id", async () => {
    const res = await getById(makeRequest("/api/listings/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });
    expect(res.status).toBe(400);
  });

  it("returns 404 for missing listing", async () => {
    const res = await getById(makeRequest("/api/listings/9999"), {
      params: Promise.resolve({ id: "9999" }),
    });
    expect(res.status).toBe(404);
  });

  it("returns listing with bookings and user", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);

    const res = await getById(makeRequest(`/api/listings/${listing.id}`), {
      params: Promise.resolve({ id: String(listing.id) }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(listing.id);
    expect(data.bookings).toBeDefined();
    expect(data.user.name).toBe("Test User");
  });
});

describe("GET /api/listings/private", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await getPrivate();
    expect(res.status).toBe(401);
  });

  it("returns listings with isWishlisted flag", async () => {
    const user = await seedUser();
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    const listing = await seedListing(user.id);
    await testDb.wishlist.create({ data: { userId: user.id, listingId: listing.id } });

    const res = await getPrivate();
    const data = await res.json();
    expect(data[0].isWishlisted).toBe(true);
  });

  it("returns isWishlisted false for unwishlisted listing", async () => {
    const user = await seedUser();
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedListing(user.id);

    const res = await getPrivate();
    const data = await res.json();
    expect(data[0].isWishlisted).toBe(false);
  });
});

describe("GET /api/listings/search", () => {
  it("returns 400 when params missing", async () => {
    const res = await searchListings(makeRequest("/api/listings/search"));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid date", async () => {
    const res = await searchListings(
      makeRequest("/api/listings/search?location=Tokyo&startDate=bad&endDate=bad")
    );
    expect(res.status).toBe(400);
  });

  it("returns listings matching location and available dates", async () => {
    const user = await seedUser();
    await seedListing(user.id, { location: "Tokyo" });

    const res = await searchListings(
      makeRequest("/api/listings/search?location=Tokyo&startDate=2026-09-01&endDate=2026-09-05")
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].location).toBe("Tokyo");
  });

  it("excludes listings with conflicting bookings", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id, { location: "Tokyo" });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2026-09-02"),
      endDate: new Date("2026-09-04"),
    });

    const res = await searchListings(
      makeRequest("/api/listings/search?location=Tokyo&startDate=2026-09-01&endDate=2026-09-05")
    );
    const data = await res.json();
    expect(data).toHaveLength(0);
  });
});
