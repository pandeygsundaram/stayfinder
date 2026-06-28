"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, Heart, CreditCard, Settings, Plus, Clock, Home } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { useAuthStore } from "@/stores/authstore"
import { differenceInDays, format } from "date-fns"

type Booking = {
  id: number
  startDate: string
  endDate: string
  status: string
  listing: {
    id: number
    title: string
    location: string
    price: number
    images: { url: string }[]
  }
}

type WishlistListing = {
  id: number
  title: string
  location: string
  price: number
  images: { url: string }[]
}

type Review = {
  id: number
  rating: number
  listing: { title: string }
}

export default function DashboardPage() {
  const { user, isInitializing } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [wishlist, setWishlist] = useState<WishlistListing[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isInitializing) return

    const load = async () => {
      try {
        const [bookingsRes, wishlistRes, reviewsRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/wishlist"),
          fetch("/api/reviews"),
        ])

        if (bookingsRes.ok) setBookings(await bookingsRes.json())
        if (wishlistRes.ok) setWishlist(await wishlistRes.json())
        if (reviewsRes.ok) setReviews(await reviewsRes.json())
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isInitializing])

  const now = new Date()
  const upcomingBookings = bookings.filter((b) => new Date(b.startDate) >= now)
  const totalSpent = bookings.reduce((sum, b) => {
    const nights = Math.max(1, differenceInDays(new Date(b.endDate), new Date(b.startDate)))
    return sum + nights * b.listing.price
  }, 0)

  const firstName = user?.name?.split(" ")[0] ?? "there"

  if (loading || isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-stayfinder-forest" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <main className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Welcome back, {firstName}! ✨
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
                Host Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">{upcomingBookings.length} upcoming</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
              <Heart className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{wishlist.length}</div>
              <p className="text-xs text-muted-foreground">in your wishlist</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                ${totalSpent.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime spending</p>
            </CardContent>
          </Card>

          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
              <Star className="h-4 w-4 text-stayfinder-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">{reviews.length}</div>
              <p className="text-xs text-muted-foreground">
                {reviews.length > 0
                  ? `avg ${(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)} stars`
                  : "No reviews yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Bookings */}
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
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
                    <p>No upcoming bookings</p>
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <Link href="/search">Find a stay</Link>
                    </Button>
                  </div>
                ) : (
                  upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex gap-4 p-4 border border-stayfinder-sage/20 rounded-lg">
                      <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-stayfinder-sage/10">
                        {booking.listing.images[0] ? (
                          <img
                            src={booking.listing.images[0].url}
                            alt={booking.listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="h-6 w-6 text-stayfinder-sage/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-stayfinder-forest dark:text-white truncate">
                          {booking.listing.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.listing.location}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span>
                            {format(new Date(booking.startDate), "MMM d")} –{" "}
                            {format(new Date(booking.endDate), "MMM d, yyyy")}
                          </span>
                          <Badge variant="secondary" className="bg-stayfinder-sage/20 text-stayfinder-forest">
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-stayfinder-forest dark:text-white">
                          $
                          {(
                            Math.max(1, differenceInDays(new Date(booking.endDate), new Date(booking.startDate))) *
                            booking.listing.price
                          ).toLocaleString()}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link href={`/property/${booking.listing.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
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
                {wishlist.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-10 w-10 mx-auto mb-3 opacity-40" />
                    <p>No saved properties yet</p>
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <Link href="/search">Explore stays</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.slice(0, 4).map((property) => (
                      <Link href={`/property/${property.id}`} key={property.id} className="group">
                        <div className="border border-stayfinder-sage/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-video relative bg-stayfinder-sage/10">
                            {property.images[0] ? (
                              <img
                                src={property.images[0].url}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Home className="h-8 w-8 text-stayfinder-sage/40" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-stayfinder-forest dark:text-white truncate">
                              {property.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.location}
                            </div>
                            <div className="mt-2">
                              <span className="font-semibold text-stayfinder-forest dark:text-white">
                                ${property.price}/night
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  <Link href="/host">
                    <Clock className="w-4 h-4 mr-2" />
                    Host Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <Card className="border-stayfinder-sage/20 premium-card">
                <CardHeader>
                  <CardTitle className="text-stayfinder-forest dark:text-white">Your Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="flex gap-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "fill-stayfinder-gold text-stayfinder-gold" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-stayfinder-forest dark:text-white truncate">{review.listing.title}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
