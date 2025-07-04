import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    const backendRes = await fetch(`${process.env.BACKEND_URL}/api/listings/${id}`);
    const data = await backendRes.json();

    return new Response(JSON.stringify(data), {
      status: backendRes.status,
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch listing' }), {
      status: 500,
    });
  }
}
