import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const backendRes = await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    const setCookie = backendRes.headers.get('set-cookie');

    const headers = new Headers();
    if (setCookie) {
      headers.set('Set-Cookie', setCookie);
    }

    return new Response(null, {
      status: backendRes.status,
      headers,
    });
  } catch (err) {
    console.error("Logout proxy error:", err);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
    });
  }
}
