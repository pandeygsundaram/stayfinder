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
import toast from "react-hot-toast"
import { signupUser } from "./formsubmit"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authstore"

export default function SignupPage() {
  const login = useAuthStore((state) => state.login)

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handlesubmit() {

    // give the form data to the function
    // and get the output
    // after that set the values in the auth store
    // redirect user to the dash board
    // toast . success

    try {
      const data = await signupUser({ email: formData.email, name: formData.name, password: formData.password })
      console.log(data)
      localStorage.setItem("token", data.token)
      login(data.user, data.token)
      toast.success("Account created successfully")
      router.push("/dashboard")

    } catch (e) {
      toast.error("Signup failed")
    }


  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <main className="container px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-caveat text-3xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Join StayFinder
            </h1>
            <p className="text-stayfinder-forest/80 dark:text-slate-300">Start your magical journey today</p>
          </div>

          <Card className="border-stayfinder-sage/20 shadow-premium">
            <CardHeader>
              <CardTitle className="text-center text-stayfinder-forest dark:text-white">Create Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-stayfinder-forest hover:text-stayfinder-sage">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-stayfinder-forest hover:text-stayfinder-sage">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage hover:from-stayfinder-forest/90 hover:to-stayfinder-sage/90 text-white"
                disabled={!formData.agreeToTerms}
                // asChild
                onClick={() => {
                  console.log(formData)
                  handlesubmit()
                }}
              >
                {/* <Link href="/dashboard"> */}
                Create Account
                {/* </Link> */}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" className="border-stayfinder-sage/30">
                  as a Guest
                </Button>

              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="text-stayfinder-forest hover:text-stayfinder-sage font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
