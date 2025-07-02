// app/api/signup/route.ts

import { NextRequest } from 'next/server';

interface SignupBody {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: SignupBody = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data.msg || 'Signup failed' }), {
        status: res.status,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong during signup' }), {
      status: 500,
    });
  }
}
