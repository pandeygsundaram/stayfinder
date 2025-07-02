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
  login: (user: User, token: string) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  user: null,
  token: null,
  login: (user, token) => {
    localStorage.setItem("token", token)
    set({ isAuthenticated: true, user, token })
  },
  logout: () => {
    localStorage.removeItem("token")
    set({ isAuthenticated: false, user: null, token: null })
  },
  initAuth: async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      set({ isInitializing: false })
      return
    }

    try {
      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const user = await res.json()
      set({ isAuthenticated: true, user, token })


    } catch (err) {
      localStorage.removeItem("token")
      set({ isAuthenticated: false, user: null, token: null })
    }finally {
      set({ isInitializing: false })
    }
  },
}))
