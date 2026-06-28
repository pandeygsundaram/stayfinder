import { GET } from "@/app/api/wishlist/route";
import { GET as checkStatus, POST as addToWishlist, DELETE as removeFromWishlist } from "@/app/api/wishlist/[id]/route";
import { cleanDb, seedUser, seedListing, testDb } from "../helpers/db";
import { makeRequest } from "../helpers/auth";

const mockAuth = jest.fn();
jest.mock("@/auth", () => ({ auth: () => mockAuth() }));
jest.mock("@/lib/prisma", () => ({ prisma: require("../helpers/db").testDb }));

beforeEach(async () => { await cleanDb(); });
afterAll(async () => { await testDb.$disconnect(); });

describe("GET /api/wishlist", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns empty wishlist", async () => {
    const user = await seedUser();
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
  });

  it("returns wishlisted listings", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await testDb.wishlist.create({ data: { userId: user.id, listingId: listing.id } });

    const res = await GET();
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Cozy Cabin");
  });
});

describe("GET /api/wishlist/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await checkStatus(makeRequest("/api/wishlist/1"), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns isWishlisted: false for un-wishlisted listing", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await checkStatus(makeRequest(`/api/wishlist/${listing.id}`), {
      params: Promise.resolve({ id: String(listing.id) }),
    });
    const data = await res.json();
    expect(data.isWishlisted).toBe(false);
  });

  it("returns isWishlisted: true for wishlisted listing", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await testDb.wishlist.create({ data: { userId: user.id, listingId: listing.id } });

    const res = await checkStatus(makeRequest(`/api/wishlist/${listing.id}`), {
      params: Promise.resolve({ id: String(listing.id) }),
    });
    const data = await res.json();
    expect(data.isWishlisted).toBe(true);
  });
});

describe("POST /api/wishlist/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await addToWishlist(makeRequest("/api/wishlist/1", { method: "POST" }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });

  it("adds a listing to wishlist", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await addToWishlist(
      makeRequest(`/api/wishlist/${listing.id}`, { method: "POST" }),
      { params: Promise.resolve({ id: String(listing.id) }) }
    );
    expect(res.status).toBe(201);
  });

  it("returns 400 when already wishlisted", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await testDb.wishlist.create({ data: { userId: user.id, listingId: listing.id } });

    const res = await addToWishlist(
      makeRequest(`/api/wishlist/${listing.id}`, { method: "POST" }),
      { params: Promise.resolve({ id: String(listing.id) }) }
    );
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/wishlist/[id]", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await removeFromWishlist(makeRequest("/api/wishlist/1", { method: "DELETE" }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });

  it("removes a listing from wishlist", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await testDb.wishlist.create({ data: { userId: user.id, listingId: listing.id } });

    const res = await removeFromWishlist(
      makeRequest(`/api/wishlist/${listing.id}`, { method: "DELETE" }),
      { params: Promise.resolve({ id: String(listing.id) }) }
    );
    expect(res.status).toBe(200);

    const check = await testDb.wishlist.findFirst({ where: { userId: user.id, listingId: listing.id } });
    expect(check).toBeNull();
  });
});
