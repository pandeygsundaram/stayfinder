import { POST, GET } from "@/app/api/reviews/route";
import { GET as getByListing } from "@/app/api/reviews/[id]/route";
import { cleanDb, seedUser, seedListing, seedBooking, testDb } from "../helpers/db";
import { makeRequest } from "../helpers/auth";

const mockAuth = jest.fn();
jest.mock("@/auth", () => ({ auth: () => mockAuth() }));
jest.mock("@/lib/prisma", () => ({ prisma: require("../helpers/db").testDb }));

beforeEach(async () => { await cleanDb(); });
afterAll(async () => { await testDb.$disconnect(); });

describe("POST /api/reviews", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await POST(makeRequest("/api/reviews", {
      method: "POST",
      json: { listingId: 1, rating: 5, comment: "Great!" },
    }));
    expect(res.status).toBe(401);
  });

  it("returns 403 without a completed booking", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await POST(makeRequest("/api/reviews", {
      method: "POST",
      json: { listingId: listing.id, rating: 5, comment: "Great!" },
    }));
    expect(res.status).toBe(403);
  });

  it("returns 403 when booking is not approved", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-01-05"),
      status: "Pending",
    });

    const res = await POST(makeRequest("/api/reviews", {
      method: "POST",
      json: { listingId: listing.id, rating: 4, comment: "Okay" },
    }));
    expect(res.status).toBe(403);
  });

  it("creates a review after a completed approved booking", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-01-05"),
      status: "Approved",
    });

    const res = await POST(makeRequest("/api/reviews", {
      method: "POST",
      json: { listingId: listing.id, rating: 5, comment: "Loved it!" },
    }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.rating).toBe(5);
    expect(data.comment).toBe("Loved it!");
  });

  it("returns 400 when reviewing the same listing twice", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await seedBooking(user.id, listing.id, {
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-01-05"),
      status: "Approved",
    });
    await testDb.review.create({
      data: { userId: user.id, listingId: listing.id, rating: 4 },
    });

    const res = await POST(makeRequest("/api/reviews", {
      method: "POST",
      json: { listingId: listing.id, rating: 3, comment: "Again" },
    }));
    expect(res.status).toBe(400);
  });
});

describe("GET /api/reviews (my reviews)", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns reviews for current user", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });
    await testDb.review.create({
      data: { userId: user.id, listingId: listing.id, rating: 5, comment: "Great!" },
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].listing.title).toBe("Cozy Cabin");
  });
});

describe("GET /api/reviews/[id] (by listing)", () => {
  it("returns 400 for invalid listing id", async () => {
    const res = await getByListing(makeRequest("/api/reviews/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });
    expect(res.status).toBe(400);
  });

  it("returns reviews for a listing", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);
    await testDb.review.create({
      data: { userId: user.id, listingId: listing.id, rating: 4, comment: "Nice" },
    });

    const res = await getByListing(makeRequest(`/api/reviews/${listing.id}`), {
      params: Promise.resolve({ id: String(listing.id) }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0].user.name).toBe("Test User");
    expect(data[0].rating).toBe(4);
  });

  it("returns empty array for listing with no reviews", async () => {
    const user = await seedUser();
    const listing = await seedListing(user.id);

    const res = await getByListing(makeRequest(`/api/reviews/${listing.id}`), {
      params: Promise.resolve({ id: String(listing.id) }),
    });
    const data = await res.json();
    expect(data).toEqual([]);
  });
});
