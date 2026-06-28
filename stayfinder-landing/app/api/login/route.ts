import { redirect } from "next/navigation"

// Auth is handled by NextAuth at /api/auth/signin
export async function POST() {
  return Response.json({ msg: "Use /api/auth/signin" }, { status: 410 })
}
