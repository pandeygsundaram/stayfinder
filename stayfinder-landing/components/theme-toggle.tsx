"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, SunMoon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative w-8 h-8">
        <SunMoon className="h-4 w-4 rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-8 h-8 overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Sun icon with rays animation */}
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />

      {/* Moon icon with stars animation */}
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          theme === "light" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />

      {/* Decorative elements */}
      <span
        className={`absolute top-1 right-1 h-1 w-1 rounded-full bg-yellow-300 transition-all duration-700 ${
          theme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100 animate-pulse"
        }`}
      />
      <span
        className={`absolute bottom-1 left-1 h-1 w-1 rounded-full bg-purple-400 transition-all duration-700 ${
          theme === "light" ? "opacity-0 scale-0" : "opacity-100 scale-100 animate-pulse"
        }`}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
