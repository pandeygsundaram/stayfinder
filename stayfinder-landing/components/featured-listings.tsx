"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const defaultTags = [
  ["Forest View", "Hot Spring"],
  ["Ocean View", "Private Beach"],
  ["Unique Stay", "Nature"],
  ["Tree House", "Magical"],
  ["Mountain View", "Secluded"],
  ["Traditional", "Hot Springs"],
]

const defaultTypes = ["Cottage", "Villa", "Castle", "Tree House", "Ryokan"]

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

type ListingFromBackend = {
  id: number
  title: string
  description?: string
  location: string
  latitude?: number
  longitude?: number
  price: number
  userId: number
  images: { url: string }[]
}

type Property = {
  id: number
  title: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  tags: string[]
}

export function FeaturedListings() {
  const [listings, setListings] = useState<Property[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/listings`)
        const data: ListingFromBackend[] = await res.json()

        const enriched = data.slice(0, 3).map((item) => ({
          id: item.id,
          title: item.title,
          location: item.location,
          price: item.price,
          rating: parseFloat((Math.random() * (5 - 4.6) + 4.6).toFixed(1)),
          reviews: Math.floor(Math.random() * 150) + 20,
          image: item.images?.[0]?.url || "/placeholder.svg?height=300&width=400",
          tags: getRandom(defaultTags),
        }))

        setListings(enriched)
      } catch (err) {
        console.error("Failed to fetch featured listings:", err)
      }
    }

    fetchListings()
  }, [])

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-caveat bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Magical Places to Stay
            </h2>
            <p className="max-w-[700px] text-stayfinder-forest/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-300">
              Discover unique homes with charm and character that feel like they're straight out of a storybook.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {listings.map((listing) => (
            <Link href={`/property/${listing.id}`} key={listing.id} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">{listing.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-stayfinder-cream dark:bg-purple-900/30 text-stayfinder-forest dark:text-purple-300 border-stayfinder-sage/30 dark:border-purple-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 border-t border-stayfinder-sage/20 dark:border-purple-900 flex items-center justify-between">
                  <div className="font-semibold text-stayfinder-forest dark:text-white">
                    ${listing.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{listing.reviews} reviews</div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-500 dark:to-pink-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <Link
              href="/search"
              className="relative inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-indigo-950 text-stayfinder-forest dark:text-purple-400 border border-stayfinder-sage/30 dark:border-purple-800 hover:bg-stayfinder-cream/50 dark:hover:bg-indigo-900 rounded-lg font-medium shadow-premium hover:shadow-premium-hover"
            >
              Explore All Stays
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
