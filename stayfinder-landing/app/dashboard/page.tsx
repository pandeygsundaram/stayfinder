"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, Heart, Clock, CreditCard, Settings, Plus, TrendingUp, Home } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const upcomingBookings = [
  {
    id: 1,
    property: "Enchanted Forest Cottage",
    location: "Miyazaki Woods, Japan",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    total: 360,
    image: "/placeholder.svg?height=100&width=150",
    status: "confirmed",
  },
  {
    id: 2,
    property: "Seaside Spirited Villa",
    location: "Coastal Village, Italy",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guests: 4,
    total: 975,
    image: "/placeholder.svg?height=100&width=150",
    status: "pending",
  },
]

const savedProperties = [
  {
    id: 1,
    title: "Floating Sky Castle",
    location: "Mountain Heights, New Zealand",
    price: 250,
    rating: 5.0,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Totoro's Tree House",
    location: "Saitama Forest, Japan",
    price: 85,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "booking",
    message: "Booking confirmed for Enchanted Forest Cottage",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "review",
    message: "You left a review for Seaside Villa",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "save",
    message: "Saved Floating Sky Castle to wishlist",
    time: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <Navbar />

      <main className="container px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Welcome back, Sophie! ✨
            </h1>
            <p className="text-stayfinder-forest/80 dark:text-slate-300">Ready for your next magical adventure?</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/search">
                <Plus className="w-4 h-4 mr-2" />
                Book a Stay
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
              <Link href="/host">
                <Home className="w-4 h-4 mr-2" />
                Become a Host
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
              <Heart className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">8</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">$2,340</div>
              <p className="text-xs text-muted-foreground">Lifetime spending</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
              <Star className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">15</div>
              <p className="text-xs text-muted-foreground">Average 4.8 stars</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-stayfinder-forest dark:text-white">Upcoming Bookings</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/bookings">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex gap-4 p-4 border border-stayfinder-sage/20 rounded-lg">
                    <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.property}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stayfinder-forest dark:text-white truncate">
                        {booking.property}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.location}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>
                          {booking.checkIn} - {booking.checkOut}
                        </span>
                        <span>{booking.guests} guests</span>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className="bg-stayfinder-sage/20 text-stayfinder-forest"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-stayfinder-forest dark:text-white">${booking.total}</div>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <Link href={`/booking/${booking.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Saved Properties */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-stayfinder-forest dark:text-white">Saved Properties</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/saved">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedProperties.map((property) => (
                    <Link href={`/property/${property.id}`} key={property.id} className="group">
                      <div className="border border-stayfinder-sage/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video relative">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-stayfinder-forest dark:text-white truncate">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.location}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-stayfinder-forest dark:text-white">
                              ${property.price}/night
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                              <span className="text-sm">{property.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/search">
                    <Plus className="w-4 h-4 mr-2" />
                    Book a New Stay
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/history">
                    <Clock className="w-4 h-4 mr-2" />
                    Booking History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/host">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Become a Host
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-stayfinder-sage mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stayfinder-forest dark:text-white">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profile completeness</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-stayfinder-sage/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage h-2 rounded-full w-[85%]" />
                  </div>
                  <p className="text-xs text-muted-foreground">Add a profile photo to complete your profile</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/profile">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
