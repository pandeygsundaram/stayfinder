import { create } from "zustand"
import { signOut } from "next-auth/react"

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
  login: (user: User) => void
  logout: () => Promise<void>
  setInitializing: (value: boolean) => void
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  user: null,
  token: null,

  login: (user) => {
    set({ isAuthenticated: true, user, isInitializing: false })
  },

  logout: async () => {
    set({ isAuthenticated: false, user: null, token: null })
    await signOut({ callbackUrl: "/login" })
  },

  setInitializing: (value) => set({ isInitializing: value }),

  // no-op: session is now managed by NextAuth via InitAuth component
  initAuth: async () => {
    set({ isInitializing: false })
  },
}))
