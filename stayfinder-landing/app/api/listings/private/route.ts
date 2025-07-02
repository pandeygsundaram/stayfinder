import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
    try {

        const token = req.headers.get("authorization");

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const res = await fetch(`${process.env.BACKEND_URL}/api/listings/private`, {
            method: "GET",
            headers: { Authorization: token },
        });

        const data = await res.json();
        console.log(data)
        return Response.json(data);
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Something went wrong' }),
            { status: 500 }
        );
    }
}