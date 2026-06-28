"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAuthStore } from "./authstore"

const AuthInit = () => {
  const { data: session, status } = useSession()
  const { login, setInitializing } = useAuthStore()

  useEffect(() => {
    if (status === "loading") return

    if (status === "authenticated" && session?.user) {
      const user = session.user as { id?: number; name?: string | null; email?: string | null }
      login({
        id: String(user.id ?? ""),
        name: user.name ?? "",
        email: user.email ?? "",
      })
    } else {
      setInitializing(false)
    }
  }, [status, session])

  return null
}

export default AuthInit
