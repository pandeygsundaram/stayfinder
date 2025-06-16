"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, Star, Users, Plus, Eye, Edit, Home } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const hostProperties = [
  {
    id: 1,
    title: "Enchanted Forest Cottage",
    location: "Miyazaki Woods, Japan",
    price: 120,
    rating: 4.9,
    reviews: 124,
    bookings: 45,
    revenue: 5400,
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    occupancy: 85,
  },
  {
    id: 2,
    title: "Totoro's Tree House",
    location: "Saitama Forest, Japan",
    price: 85,
    rating: 4.7,
    reviews: 203,
    bookings: 67,
    revenue: 5695,
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    occupancy: 92,
  },
]

const recentBookings = [
  {
    id: 1,
    guest: "Sophie",
    property: "Enchanted Forest Cottage",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    total: 360,
    status: "confirmed",
  },
  {
    id: 2,
    guest: "Kiki",
    property: "Totoro's Tree House",
    checkIn: "2024-02-20",
    checkOut: "2024-02-23",
    guests: 3,
    total: 255,
    status: "pending",
  },
]

const messages = [
  {
    id: 1,
    guest: "Sophie",
    property: "Enchanted Forest Cottage",
    message: "Hi! I have a question about the hot spring access...",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    guest: "Howl",
    property: "Totoro's Tree House",
    message: "Thank you for the wonderful stay!",
    time: "1 day ago",
    unread: false,
  },
]

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalRevenue = hostProperties.reduce((sum, property) => sum + property.revenue, 0)
  const totalBookings = hostProperties.reduce((sum, property) => sum + property.bookings, 0)
  const averageRating = hostProperties.reduce((sum, property) => sum + property.rating, 0) / hostProperties.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <Navbar />

      <main className="container px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Host Dashboard ✨
            </h1>
            <p className="text-stayfinder-forest/80 dark:text-slate-300">Manage your magical properties and bookings</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
            <Link href="/host/add-property">
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Home className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{hostProperties.length}</div>
              <p className="text-xs text-muted-foreground">All properties active</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 border border-stayfinder-sage/20 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-stayfinder-forest dark:text-white">{booking.guest}</h3>
                        <p className="text-sm text-muted-foreground">{booking.property}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.checkIn} - {booking.checkOut}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-stayfinder-forest dark:text-white">${booking.total}</div>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className="bg-stayfinder-sage/20 text-stayfinder-forest"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Occupancy Rate</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <div className="w-full bg-stayfinder-sage/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage h-2 rounded-full w-[88%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-stayfinder-sage/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage h-2 rounded-full w-[95%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Guest Satisfaction</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <div className="w-full bg-stayfinder-sage/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage h-2 rounded-full w-[96%]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {hostProperties.map((property) => (
                <Card key={property.id} className="border-stayfinder-sage/20 premium-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">
                              {property.title}
                            </h3>
                            <p className="text-muted-foreground">{property.location}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="flex items-center">
                                <Star className="h-3 w-3 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                                {property.rating} ({property.reviews} reviews)
                              </span>
                              <span>${property.price}/night</span>
                              <Badge variant="default" className="bg-stayfinder-sage/20 text-stayfinder-forest">
                                {property.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-stayfinder-sage/20">
                          <div className="text-center">
                            <div className="font-semibold text-stayfinder-forest dark:text-white">
                              {property.bookings}
                            </div>
                            <div className="text-xs text-muted-foreground">Bookings</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-stayfinder-forest dark:text-white">
                              ${property.revenue}
                            </div>
                            <div className="text-xs text-muted-foreground">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-stayfinder-forest dark:text-white">
                              {property.occupancy}%
                            </div>
                            <div className="text-xs text-muted-foreground">Occupancy</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-stayfinder-sage/20 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium text-stayfinder-forest dark:text-white">{booking.guest}</h3>
                            <p className="text-sm text-muted-foreground">{booking.property}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>
                              {booking.checkIn} - {booking.checkOut}
                            </div>
                            <div>{booking.guests} guests</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-stayfinder-forest dark:text-white">${booking.total}</div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className="bg-stayfinder-sage/20 text-stayfinder-forest"
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Guest Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-4 p-4 border border-stayfinder-sage/20 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-stayfinder-sage/20 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-stayfinder-forest" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-stayfinder-forest dark:text-white">{message.guest}</h3>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{message.property}</span>
                          {message.unread && (
                            <Badge variant="default" className="bg-stayfinder-forest text-white text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
