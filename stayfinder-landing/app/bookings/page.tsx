"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface BookingHistory {
  id: number
  startDate: string
  endDate: string
  listing: {
    id: number
    title: string
    location: string
    price: number
    images: { id: number; url: string }[]
  }
}

const bookingHistory: BookingHistory[] = [
  {
    id: 1,
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    listing: {
      id: 101,
      title: "Cozy Mountain Cabin",
      location: "Manali, Himachal Pradesh",
      price: 3500,
      images: [
        { id: 1, url: "https://placehold.co/600x400?text=Cabin+1" },
        { id: 2, url: "https://placehold.co/600x400?text=Cabin+2" },
      ],
    },
  },
  {
    id: 2,
    startDate: "2025-07-01",
    endDate: "2025-07-03",
    listing: {
      id: 102,
      title: "Luxury Beachfront Villa",
      location: "Goa, India",
      price: 7000,
      images: [
        { id: 3, url: "https://placehold.co/600x400?text=Villa+1" },
        { id: 4, url: "https://placehold.co/600x400?text=Villa+2" },
      ],
    },
  },
  {
    id: 3,
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    listing: {
      id: 103,
      title: "Modern Apartment in City Center",
      location: "Bangalore, Karnataka",
      price: 2500,
      images: [
        { id: 5, url: "https://placehold.co/600x400?text=Apartment+1" },
        { id: 6, url: "https://placehold.co/600x400?text=Apartment+2" },
        { id: 7, url: "https://placehold.co/600x400?text=Apartment+3" },
      ],
    },
  },
];

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<BookingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "GET",
        headers: {
          // if you're storing token in cookies, you might not need this,
          // but if you're using localStorage or context:
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch booking history");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getBookingStatus = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)

    if (end < today) {
      return { status: "completed", label: "Completed", variant: "default" as const }
    } else {
      return { status: "upcoming", label: "Upcoming", variant: "secondary" as const }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
        <main className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stayfinder-forest mx-auto mb-4"></div>
              <p className="text-stayfinder-forest/80 dark:text-slate-300">Loading your bookings...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">

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
            Your Booking ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">Your magical journey through time and places</p>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => {
            const bookingStatus = getBookingStatus(booking.endDate)
            const nights = calculateNights(booking.startDate, booking.endDate)
            const totalCost = booking.listing.price * nights

            return (
              <Card key={booking.id} className="border-stayfinder-sage/20 premium-card">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.listing.images[0]?.url || "/placeholder.svg?height=100&width=150"}
                        alt={booking.listing.title}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">
                            {booking.listing.title}
                          </h3>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.listing.location}
                          </div>
                        </div>
                        <Badge variant={bookingStatus.variant} className="bg-stayfinder-sage/20 text-stayfinder-forest">
                          {bookingStatus.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-stayfinder-sage" />
                          <div>
                            <div className="text-sm font-medium">Check-in</div>
                            <div className="text-sm text-muted-foreground">{formatDate(booking.startDate)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-stayfinder-sage" />
                          <div>
                            <div className="text-sm font-medium">Check-out</div>
                            <div className="text-sm text-muted-foreground">{formatDate(booking.endDate)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-sm font-medium">Total Cost</div>
                            <div className="text-sm text-muted-foreground">
                              ${totalCost} ({nights} nights)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/property/${booking.listing.id}`}>View Property</Link>
                      </Button>
                      {bookingStatus.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {bookings.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2 text-stayfinder-forest dark:text-white">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">Start your magical journey by booking your first stay!</p>
            <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
              <Link href="/search">Explore Properties</Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
