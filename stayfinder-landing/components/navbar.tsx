"use client"

import Link from "next/link"
import { Menu, Search, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/stores/authstore"
import { useRouter } from "next/navigation"

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout, isAuthenticated, isInitializing } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparentNow = transparent && !isScrolled

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-all duration-500",
        transparent ? "fixed" : "sticky",
        isTransparentNow
          ? "bg-transparent border-transparent"
          : isScrolled
            ? "bg-[#FFFDFC]/95 dark:bg-[#090C0E]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5"
            : "bg-[#FFFDFC] dark:bg-[#090C0E] border-b border-gray-100 dark:border-white/5"
      )}
    >
      <div className="w-full px-6 md:px-12 py-5 flex justify-between items-center">

        {/* LEFT — hamburger + nav links */}
        <div className="flex items-center gap-6 md:gap-8">
          <Sheet>
            <SheetTrigger asChild>
              <button className={cn(
                "p-2.5 rounded-lg transition",
                isTransparentNow
                  ? "bg-white/20 hover:bg-white/30"
                  : "bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20"
              )}>
                <Menu className={cn("w-4 h-4", isTransparentNow ? "text-white" : "text-[#111] dark:text-white")} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#FFFDFC] dark:bg-[#090C0E] border-0 w-72">
              <div className="flex flex-col gap-6 mt-8 px-2">
                <Link href="/" className="font-serif text-2xl tracking-widest text-[#111] dark:text-white">
                  STAY<span className="font-bold italic">FINDER</span>
                </Link>
                <div className="h-px bg-gray-100 dark:bg-white/10" />
                <Link href="/search" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">
                  Explore
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">Dashboard</Link>
                    <Link href="/bookings" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">My Bookings</Link>
                    <Link href="/saved" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">Wishlist</Link>
                    <Link href="/host" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">Host</Link>
                    <Link href="/profile" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">Profile</Link>
                    <div className="h-px bg-gray-100 dark:bg-white/10" />
                    <button
                      className="text-left text-xs font-bold tracking-[0.18em] uppercase text-[#F04C33]"
                      onClick={() => { logout(); router.push("/login") }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 hover:text-[#F04C33] transition">Sign In</Link>
                    <Link href="/signup" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F04C33]">Sign Up →</Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/search"
            className={cn(
              "hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#F04C33]",
              isTransparentNow ? "text-white/90" : "text-gray-500 dark:text-gray-400"
            )}
          >
            Explore
          </Link>
          {!isInitializing && isAuthenticated && (
            <Link
              href="/host"
              className={cn(
                "hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#F04C33]",
                isTransparentNow ? "text-white/90" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Host
            </Link>
          )}
        </div>

        {/* CENTER — wordmark */}
        <Link href="/" className={cn(
          "font-serif text-xl md:text-2xl tracking-widest absolute left-1/2 -translate-x-1/2 transition-colors duration-500",
          isTransparentNow ? "text-white" : "text-[#111] dark:text-white"
        )}>
          STAY<span className="font-bold italic">FINDER</span>
        </Link>

        {/* RIGHT — theme toggle + auth */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isInitializing ? (
            <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className={cn(
                  "hidden md:flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors hover:text-[#F04C33]",
                  isTransparentNow ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                )}
              >
                <Search className="w-3.5 h-3.5" />
                Search
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:border-[#F04C33] hover:text-[#F04C33]",
                    isTransparentNow
                      ? "border border-white/60 text-white"
                      : "border border-gray-200 dark:border-white/10 text-[#111] dark:text-white"
                  )}>
                    <User className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/host">Host Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-[#F04C33] focus:text-[#F04C33]"
                    onClick={() => { logout(); router.push("/login") }}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className={cn(
                  "text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#F04C33]",
                  isTransparentNow ? "text-white/90" : "text-gray-500 dark:text-gray-400"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#F04C33] hover:bg-[#d94129] text-white rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
