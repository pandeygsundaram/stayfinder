import { NextRequest } from 'next/server';


export async function GET(): Promise<Response> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/listings`);
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest): Promise<Response> {
  try {
    const authHeader = req.headers.get('authorization');
    const payload = await req.json();

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), {
        status: 401,
      });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    return new Response(JSON.stringify({ error: 'Failed to create listing' }), {
      status: 500,
    });
  }
}
