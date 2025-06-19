"use client"
import { useEffect } from "react"
import { useAuthStore } from "./authstore"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

const AuthInit = () => {
  const initAuth = useAuthStore((state) => state.initAuth)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const runInit = async () => {
      await initAuth()

      if (isAuthenticated && pathname === "/") {
        router.push("/search")
      }
    }
    runInit()
  }, [initAuth, isAuthenticated, router])

  return null
}

export default AuthInit