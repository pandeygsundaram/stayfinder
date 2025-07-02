import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BACKEND_URL;

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
