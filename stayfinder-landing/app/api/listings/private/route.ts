import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
    try {

        const cookieHeader = req.headers.get('cookie')

        if (!cookieHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const res = await fetch(`${process.env.BACKEND_URL}/api/listings/private`, {
            method: "GET",
            headers: { 'Cookie': cookieHeader || '', },
        });

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Something went wrong' }),
            { status: 500 }
        );
    }
}