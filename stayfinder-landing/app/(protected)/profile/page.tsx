"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Camera, Shield, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Sophie",
    lastName: "Hatter",
    email: "sophie@example.com",
    phone: "+1 (555) 123-4567",
    bio: "I love exploring magical places and creating unforgettable memories. Always looking for cozy cottages and unique stays!",
    location: "San Francisco, CA",
    language: "English",
    currency: "USD",
  })

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPromotions: false,
    pushBookings: true,
    pushMessages: true,
    smsBookings: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    reviewsVisible: true,
    wishlistVisible: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      {/* <Navbar /> */}
      
      <main className="container px-4 md:px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Profile Settings ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Photo */}
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl bg-stayfinder-sage/20 text-stayfinder-forest">
                      {profile.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                          className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                          className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-stayfinder-sage/20 premium-card">
                  <CardHeader>
                    <CardTitle className="text-stayfinder-forest dark:text-white">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="language"
                            value={profile.language}
                            onChange={(e) => setProfile({...profile, language: e.target.value})}
                            className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                          id="currency"
                          value={profile.currency}
                          onChange={(e) => setProfile({...profile, currency: e.target.value})}
                          className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
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
                    onCheckedChange={(checked) => setNotifications({...notifications, emailBookings: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Promotions and offers</div>
                    <div className="text-sm text-muted-foreground">Receive special deals and promotions</div>
                  </div>
                  <Switch
                    checked={notifications.emailPromotions}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailPromotions: checked})}
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
                    onCheckedChange={(checked) => setNotifications({...notifications, pushBookings: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Messages from hosts</div>
                    <div className="text-sm text-muted-foreground">New messages from your hosts</div>
                  </div>
                  <Switch
                    checked={notifications.pushMessages}
                    onCheckedChange={(checked) => setNotifications({...notifications, pushMessages: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">SMS Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Booking reminders</div>
                    <div className="text-sm text-muted-foreground">SMS reminders before your stay</div>
                  </div>
                  <Switch
                    checked={notifications.smsBookings}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsBookings: checked})}
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
                    onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Reviews visible</div>
                    <div className="text-sm text-muted-foreground">Show your reviews on your public profile</div>
                  </div>
                  <Switch
                    checked={privacy.reviewsVisible}
                    onCheckedChange={(checked) => setPrivacy({...privacy, reviewsVisible: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Wishlist visible</div>
                    <div className="text-sm text-muted-foreground">Allow others to see your saved properties</div>
                  </div>
                  <Switch
                    checked={privacy.wishlistVisible}
                    onCheckedChange={(checked) => setPrivacy({...privacy, wishlistVisible: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
                <Button className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Enable 2FA
                </Button>
              </CardContent>
            </Card>

            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Download my data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    Delete my account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )}
