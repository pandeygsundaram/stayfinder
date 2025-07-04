// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieHeader = req.headers.get('cookie')

    if (!cookieHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch(`${process.env.BACKEND_URL}/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Cookie': cookieHeader || '',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    console.log(data)

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[BOOKING_API]", error.message || error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie')

    if (!cookieHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch(`${process.env.BACKEND_URL}/api/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Cookie': cookieHeader || '',
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[BOOKING_API][GET]", error.message || error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }

}
