"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authstore"

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      // Redirect if you want, or just leave it as a warning
      // router.replace("/login")
    }
  }, [isInitializing, isAuthenticated])

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading... 🌀
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-red-600 font-bold">
        Please my boy 😤
      </div>
    )
  }

  return <>{children}</>
}
