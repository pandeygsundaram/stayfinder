// app/api/me/route.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const token = req.headers.get('authorization');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
    });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), {
      status: 500,
    });
  }
}
