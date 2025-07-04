import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BACKEND_URL;

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: {
      'Cookie': cookieHeader || '',
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
