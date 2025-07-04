import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json(); // get email & password from request

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const cookie = response.headers.get('set-cookie')

    const headers = new Headers()

    if (cookie) {
      headers.set('Set-Cookie', cookie)
    }
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers,
    })
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
    });
  }
}
