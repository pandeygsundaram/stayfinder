import { GET } from "@/app/api/me/route";
import { cleanDb, seedUser, testDb } from "../helpers/db";
import { makeRequest } from "../helpers/auth";

const mockAuth = jest.fn();
jest.mock("@/auth", () => ({ auth: () => mockAuth() }));
jest.mock("@/lib/prisma", () => ({ prisma: require("../helpers/db").testDb }));

beforeEach(async () => { await cleanDb(); });
afterAll(async () => { await testDb.$disconnect(); });

describe("GET /api/me", () => {
  it("returns 401 when not logged in", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(makeRequest("/api/me"));
    expect(res.status).toBe(401);
  });

  it("returns user data when authenticated", async () => {
    const user = await seedUser();
    mockAuth.mockResolvedValue({ user: { id: user.id, email: user.email } });

    const res = await GET(makeRequest("/api/me"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.email).toBe("test@example.com");
    expect(data.id).toBe(user.id);
  });

  it("returns 404 when user in session does not exist in DB", async () => {
    mockAuth.mockResolvedValue({ user: { id: 99999, email: "ghost@example.com" } });
    const res = await GET(makeRequest("/api/me"));
    expect(res.status).toBe(404);
  });
});
