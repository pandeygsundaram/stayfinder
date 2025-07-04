"use client"

import Link from "next/link"
import { Home, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuthStore()
  const router = useRouter()
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)
  const { isAuthenticated, isInitializing } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-indigo-950/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-500 dark:to-pink-500 rounded-full opacity-90 blur-[1px]" />
            <div className="absolute inset-[2px] bg-white dark:bg-indigo-950 rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 text-stayfinder-forest dark:text-purple-400" />
            </div>
          </div>
          <span className="font-caveat text-2xl font-bold bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            StayFinder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/search"
            className="text-sm font-medium hover:text-stayfinder-forest dark:hover:text-purple-400 transition-colors"
          >
            Explore
          </Link>
          {!isInitializing && isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-stayfinder-forest dark:hover:text-purple-400 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />


          {isInitializing ? (
            <div className="flex items-center justify-center h-8 w-8 animate-spin">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          ) :
            isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2" >
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/search">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/host">Host Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout()
                        router.push("/login")
                      }}
                    >Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage hover:from-stayfinder-forest/90 hover:to-stayfinder-sage/90 text-white dark:from-purple-500 dark:to-pink-500"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/search" className="text-lg font-medium">
                  Explore
                </Link>
                <Link href="/host" className="text-lg font-medium">
                  Become a Host
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="text-lg font-medium">
                      Dashboard
                    </Link>
                    <Link href="/bookings" className="text-lg font-medium">
                      My Bookings
                    </Link>
                    <Link href="/profile" className="text-lg font-medium">
                      Profile
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-500 dark:to-pink-500"
                      asChild
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header >
  )
}
