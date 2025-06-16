import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const listings = [
  {
    id: 1,
    title: "Enchanted Forest Cottage",
    location: "Miyazaki Woods, Japan",
    price: 120,
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Forest View", "Hot Spring"],
  },
  {
    id: 2,
    title: "Seaside Spirited Villa",
    location: "Coastal Village, Italy",
    price: 195,
    rating: 4.8,
    reviews: 86,
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Ocean View", "Private Beach"],
  },
  {
    id: 3,
    title: "Floating Sky Castle",
    location: "Mountain Heights, New Zealand",
    price: 250,
    rating: 5.0,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Mountain View", "Unique Stay"],
  },
]

export function FeaturedListings() {
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
            <Link href="#" key={listing.id} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                    {listing.location}
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
              href="#"
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
