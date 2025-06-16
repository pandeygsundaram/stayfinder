"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface WishlistItem {
  id: number
  listing: {
    id: number
    title: string
    description: string | null
    location: string
    price: number
    images: { id: number; url: string }[]
    _count?: { bookings: number; Wishlist: number }
  }
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      // This would normally use the current user's ID from auth context
      const userId = 1 // Placeholder - replace with actual user ID

      const response = await fetch(`/api/wishlist?userId=${userId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist")
      }

      const data = await response.json()
      setWishlistItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const removeFromWishlist = async (listingId: number) => {
    try {
      // This would normally use the current user's ID from auth context
      const userId = 1 // Placeholder - replace with actual user ID

      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, listingId }),
      })

      if (response.ok) {
        // Remove the item from the local state
        setWishlistItems((prev) => prev.filter((item) => item.listing.id !== listingId))
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
        <Navbar />
        <main className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stayfinder-forest mx-auto mb-4"></div>
              <p className="text-stayfinder-forest/80 dark:text-slate-300">Loading your magical wishlist...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <Navbar />

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
            Your Wishlist ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            {wishlistItems.length > 0
              ? `${wishlistItems.length} magical places you've saved for later`
              : "Start saving your favorite magical places"}
          </p>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchWishlist} className="mt-2" variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Grid */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/property/${item.listing.id}`}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.listing.images[0]?.url || "/placeholder.svg?height=300&width=400"}
                        alt={item.listing.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white line-clamp-1">
                          {item.listing.title}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-3.5 w-3.5 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {item.listing.location}
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.listing.description || "A magical place to stay with wonderful amenities."}
                      </p>
                    </CardContent>

                    <CardFooter className="p-4 border-t border-stayfinder-sage/20 dark:border-purple-900 flex items-center justify-between">
                      <div className="font-semibold text-stayfinder-forest dark:text-white">
                        ${item.listing.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-stayfinder-cream dark:bg-purple-900/30 text-stayfinder-forest dark:text-purple-300 border-stayfinder-sage/30 dark:border-purple-800"
                      >
                        Saved
                      </Badge>
                    </CardFooter>
                  </Card>
                </Link>

                {/* Remove from Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault()
                    removeFromWishlist(item.listing.id)
                  }}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="relative w-32 h-32 mx-auto mb-6">
              {/* Magical empty wishlist illustration */}
              <div className="absolute inset-0 bg-gradient-to-b from-stayfinder-sky/30 to-stayfinder-sage/20 dark:from-indigo-900 dark:to-purple-900 rounded-full" />
              <div className="absolute inset-4 bg-white dark:bg-indigo-950 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-stayfinder-sage/50" />
              </div>
              {/* Floating sparkles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-stayfinder-gold rounded-full animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-stayfinder-sage rounded-full animate-pulse delay-300" />
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-stayfinder-gold rounded-full animate-pulse delay-700" />
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-stayfinder-forest dark:text-white font-caveat">
              Your wishlist is waiting for magic ✨
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring and save the magical places that capture your heart. Your perfect getaway might be just a
              click away!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
                <Link href="/search">
                  <Heart className="w-4 h-4 mr-2" />
                  Explore Properties
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Wishlist Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="inline-block border-stayfinder-sage/20 premium-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-stayfinder-forest dark:text-white">
                  Ready to book your dream stay?
                </h3>
                <p className="text-muted-foreground mb-4">Turn your wishlist into unforgettable memories</p>
                <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
                  <Link href="/search">Continue Exploring</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
