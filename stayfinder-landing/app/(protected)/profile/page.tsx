"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

type UserProfile = {
  id: number
  name: string
  email: string
  image: string | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPromotions: false,
    pushBookings: true,
    pushMessages: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    reviewsVisible: true,
    wishlistVisible: false,
  })

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data: UserProfile) => {
        setProfile(data)
        setName(data.name)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error("Failed to save")
      const updated: UserProfile = await res.json()
      setProfile(updated)
      setName(updated.name)
      toast.success("Profile updated!")
    } catch {
      toast.error("Failed to save profile.")
    } finally {
      setSaving(false)
    }
  }

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <main className="container px-4 md:px-6 py-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Profile Settings ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-stayfinder-forest" />
          </div>
        ) : (
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Avatar */}
                <Card className="border-stayfinder-sage/20 premium-card">
                  <CardHeader>
                    <CardTitle className="text-stayfinder-forest dark:text-white">Profile Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile?.image ?? undefined} />
                      <AvatarFallback className="text-2xl bg-stayfinder-sage/20 text-stayfinder-forest">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-center text-muted-foreground">
                      Profile photo is synced from your Google account
                    </p>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-stayfinder-sage/20 premium-card">
                    <CardHeader>
                      <CardTitle className="text-stayfinder-forest dark:text-white">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            value={profile?.email ?? ""}
                            readOnly
                            className="pl-10 border-stayfinder-sage/30 bg-muted cursor-not-allowed"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Email is managed by Google and cannot be changed here.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setName(profile?.name ?? "")}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white"
                  onClick={handleSave}
                  disabled={saving || name === profile?.name}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Email Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking confirmations</div>
                      <div className="text-sm text-muted-foreground">Get notified when bookings are confirmed</div>
                    </div>
                    <Switch
                      checked={notifications.emailBookings}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Promotions and offers</div>
                      <div className="text-sm text-muted-foreground">Receive special deals and promotions</div>
                    </div>
                    <Switch
                      checked={notifications.emailPromotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailPromotions: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Push Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking updates</div>
                      <div className="text-sm text-muted-foreground">Important updates about your bookings</div>
                    </div>
                    <Switch
                      checked={notifications.pushBookings}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushBookings: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Messages from hosts</div>
                      <div className="text-sm text-muted-foreground">New messages from your hosts</div>
                    </div>
                    <Switch
                      checked={notifications.pushMessages}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushMessages: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Profile Visibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Public profile</div>
                      <div className="text-sm text-muted-foreground">Allow others to see your profile information</div>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reviews visible</div>
                      <div className="text-sm text-muted-foreground">Show your reviews on your public profile</div>
                    </div>
                    <Switch
                      checked={privacy.reviewsVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, reviewsVisible: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Wishlist visible</div>
                      <div className="text-sm text-muted-foreground">Allow others to see your saved properties</div>
                    </div>
                    <Switch
                      checked={privacy.wishlistVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, wishlistVisible: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete my account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
