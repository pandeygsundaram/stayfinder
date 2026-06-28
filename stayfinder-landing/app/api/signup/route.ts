// Registration is handled automatically on first Google sign-in
export async function POST() {
  return Response.json({ msg: "Use /api/auth/signin with Google" }, { status: 410 })
}
