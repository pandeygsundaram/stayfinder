import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BACKEND_URL;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

  const cookieHeader = req.headers.get('cookie')

  if (!cookieHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BASE_URL}/api/wishlist/${params.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Cookie': cookieHeader || '',
    },
  });

  const data = await res.json();
  console.log(data)
  return NextResponse.json(data, { status: res.status });

}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${BASE_URL}/api/wishlist/${params.id}`, {
    method: "DELETE",
    headers: {
      'Cookie': cookieHeader || '',
    },
  });

  const data = await res.json();
  console.log(data)
  return NextResponse.json(data, { status: res.status });

}



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const cookieHeader = req.headers.get('cookie')
  
  if (!cookieHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = params;
  
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist/${id}`, {
      method: "GET",
      headers: {
        'Cookie': cookieHeader || '',
      },
    });

    const data = await res.json();
    console.log(data)
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error checking wishlist status:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
