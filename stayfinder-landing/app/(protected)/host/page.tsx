"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, Star, Plus, Eye, Edit, Home, Loader2 } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { useAuthStore } from "@/stores/authstore"

type HostListing = {
  id: number
  title: string
  location: string
  price: number
  images: { url: string }[]
  bookings: {
    id: number
    startDate: string
    endDate: string
    status: string
  }[]
}

export default function HostDashboardPage() {
  const { isInitializing } = useAuthStore()
  const [listings, setListings] = useState<HostListing[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (isInitializing) return

    fetch("/api/listings?mine=true")
      .then((r) => r.json())
      .then((data: HostListing[]) => setListings(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isInitializing])

  const totalBookings = listings.reduce((sum, l) => sum + l.bookings.length, 0)
  const totalRevenue = listings.reduce((sum, l) => {
    return sum + l.bookings.reduce((bSum, b) => {
      const nights = Math.max(
        1,
        Math.round((new Date(b.endDate).getTime() - new Date(b.startDate).getTime()) / (1000 * 60 * 60 * 24))
      )
      return bSum + nights * l.price
    }, 0)
  }, 0)

  const allBookings = listings
    .flatMap((l) =>
      l.bookings.map((b) => ({
        ...b,
        listing: { id: l.id, title: l.title },
      }))
    )
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  if (loading || isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-stayfinder-forest" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <main className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Host Dashboard ✨
            </h1>
            <p className="text-stayfinder-forest/80 dark:text-slate-300">Manage your properties and bookings</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
            <Link href="/host/add-property">
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">From all bookings</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">Across all properties</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Home className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{listings.length}</div>
              <p className="text-xs text-muted-foreground">Listed on StayFinder</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {listings.length === 0 ? (
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <Home className="h-12 w-12 mb-4 opacity-40" />
                  <p className="text-lg mb-4">You haven't listed any properties yet</p>
                  <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
                    <Link href="/host/add-property">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Property
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {listings.map((listing) => (
                  <Card key={listing.id} className="border-stayfinder-sage/20 premium-card">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-stayfinder-sage/10">
                          {listing.images[0] ? (
                            <img
                              src={listing.images[0].url}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Home className="h-8 w-8 text-stayfinder-sage/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">
                                {listing.title}
                              </h3>
                              <p className="text-muted-foreground">{listing.location}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span>${listing.price}/night</span>
                                <Badge variant="default" className="bg-stayfinder-sage/20 text-stayfinder-forest">
                                  Active
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/property/${listing.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-stayfinder-sage/20">
                            <div className="text-center">
                              <div className="font-semibold text-stayfinder-forest dark:text-white">
                                {listing.bookings.length}
                              </div>
                              <div className="text-xs text-muted-foreground">Total Bookings</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-stayfinder-forest dark:text-white">
                                $
                                {listing.bookings
                                  .reduce((sum, b) => {
                                    const nights = Math.max(
                                      1,
                                      Math.round(
                                        (new Date(b.endDate).getTime() - new Date(b.startDate).getTime()) /
                                          (1000 * 60 * 60 * 24)
                                      )
                                    )
                                    return sum + nights * listing.price
                                  }, 0)
                                  .toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Revenue</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {allBookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Calendar className="h-10 w-10 mb-3 opacity-40" />
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border border-stayfinder-sage/20 rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-stayfinder-forest dark:text-white">{booking.listing.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.startDate).toLocaleDateString()} –{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={booking.status === "Approved" ? "default" : "secondary"}
                          className="bg-stayfinder-sage/20 text-stayfinder-forest"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
