"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import toast from "react-hot-toast"

interface Listing {
  id: number
  title: string
  description: string | null
  location: string
  price: number
  images: { id: number; url: string }[]
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/wishlist")
      if (!response.ok) throw new Error("Failed to fetch wishlist")
      setWishlistItems(await response.json())
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load wishlist")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const removeFromWishlist = async (listingId: number) => {
    try {
      const res = await fetch(`/api/wishlist/${listingId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to remove")
      setWishlistItems((prev) => prev.filter((item) => item.id !== listingId))
      toast.success("Removed from wishlist")
    } catch {
      toast.error("Could not remove from wishlist")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stayfinder-forest" />
      </div>
    )
  }

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
            Your Wishlist ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            {wishlistItems.length > 0
              ? `${wishlistItems.length} ${wishlistItems.length === 1 ? "place" : "places"} saved`
              : "Start saving your favorite places"}
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/property/${item.id}`}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900">
                    <div className="relative aspect-[4/3] overflow-hidden bg-stayfinder-sage/10">
                      <Image
                        src={item.images[0]?.url || "/placeholder.svg?height=300&width=400"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="p-4">
                      <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {item.location}
                      </div>
                    </CardHeader>

                    {item.description && (
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      </CardContent>
                    )}

                    <CardFooter className="p-4 border-t border-stayfinder-sage/20 dark:border-purple-900 flex items-center justify-between">
                      <div className="font-semibold text-stayfinder-forest dark:text-white">
                        ${item.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
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

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  onClick={(e) => {
                    e.preventDefault()
                    removeFromWishlist(item.id)
                  }}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-b from-stayfinder-sky/30 to-stayfinder-sage/20 dark:from-indigo-900 dark:to-purple-900 rounded-full" />
              <div className="absolute inset-4 bg-white dark:bg-indigo-950 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-stayfinder-sage/50" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-stayfinder-forest dark:text-white font-caveat">
              Your wishlist is empty ✨
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explore properties and save the ones you love.
            </p>
            <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
              <Link href="/search">
                <Heart className="w-4 h-4 mr-2" />
                Explore Properties
              </Link>
            </Button>
          </div>
        )}

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
