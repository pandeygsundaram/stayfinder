"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useSetRecoilState } from "recoil"
import { useAuthStore } from "@/stores/authstore" // 👈 NEW Zustand store
import { cookies } from 'next/headers'

export default function LoginPage() {

  const login = useAuthStore((state) => state.login)

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    if (!email || !password) {
      toast.error("Bruh... Fill all the fields 😑")
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Login failed 💀")
        return
      }

      login(data.user, data.token)

      toast.success("Logged in successfully 🎉")
      router.push("/dashboard")
    } catch (err) {
      toast.error("Something went wrong 💣")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      {/* <Navbar /> */}

      <main className="container px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-caveat text-3xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Welcome back to StayFinder
            </h1>
            <p className="text-stayfinder-forest/80 dark:text-slate-300">Sign in to continue your magical journey</p>
          </div>

          <Card className="border-stayfinder-sage/20 shadow-premium">
            <CardHeader>
              <CardTitle className="text-center text-stayfinder-forest dark:text-white">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-stayfinder-forest hover:text-stayfinder-sage">
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage hover:from-stayfinder-forest/90 hover:to-stayfinder-sage/90 text-white"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? "Signing in..." : "Sign In"}


              </Button>



              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/signup" className="text-stayfinder-forest hover:text-stayfinder-sage font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
