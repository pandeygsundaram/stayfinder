"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Listing = {
  id: number
  title: string
  location: string
  price: number
  images: { url: string }[]
}

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then((data: Listing[]) => setListings(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(console.error)
  }, [])

  if (listings.length === 0) return null

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-caveat bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Places to Stay
            </h2>
            <p className="max-w-[700px] text-stayfinder-forest/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-300">
              Discover unique homes with charm and character.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {listings.map((listing) => (
            <Link href={`/property/${listing.id}`} key={listing.id} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900">
                <div className="relative h-64 w-full overflow-hidden bg-stayfinder-sage/10">
                  <Image
                    src={listing.images?.[0]?.url || "/placeholder.svg?height=300&width=400"}
                    alt={listing.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="p-4">
                  <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">{listing.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                </CardHeader>

                <CardFooter className="p-4 border-t border-stayfinder-sage/20 dark:border-purple-900">
                  <div className="font-semibold text-stayfinder-forest dark:text-white">
                    ${listing.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                  </div>
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
