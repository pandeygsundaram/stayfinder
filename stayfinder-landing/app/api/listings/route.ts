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
