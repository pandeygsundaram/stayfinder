// Auth is handled by NextAuth at /api/auth/signout
export async function POST() {
  return Response.json({ msg: "Use /api/auth/signout" }, { status: 410 })
}
