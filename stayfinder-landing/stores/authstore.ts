import { create } from "zustand"

type User = {
  id: string
  name: string
  email: string
}

type AuthState = {
  isAuthenticated: boolean
  isInitializing: boolean
  user: User | null
  token: string | null
  login: (user: User, token?: string) => void
  logout: () => Promise<void>
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  user: null,
  token: null,

  login: (user) => {
    set({ isAuthenticated: true, user })
  },

  logout: async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.error("Failed to logout cleanly", e)
    } finally {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
      })
    }
  },

  initAuth: async () => {
    try {
      const res = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      })

      if (!res.ok) throw new Error("Unauthorized")

      const user = await res.json()
      set({ isAuthenticated: true, user })
    } catch (err) {
      await useAuthStore.getState().logout()
    } finally {
      set({ isInitializing: false })
    }
  },
}))
