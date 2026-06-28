"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type Review = {
  id: number
  rating: number
  comment: string | null
  user: { name: string; image: string | null }
  listing: { location: string }
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch("/api/reviews/top")
      .then((r) => r.json())
      .then((data: Review[]) => setReviews(Array.isArray(data) ? data : []))
      .catch(console.error)
  }, [])

  if (reviews.length === 0) return null

  return (
    <section className="py-12 md:py-24 bg-stayfinder-cream/50 dark:bg-indigo-950/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-caveat bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              What Guests Are Saying
            </h2>
            <p className="max-w-[700px] text-stayfinder-forest/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-300">
              Stories from travelers who found their home away from home.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-white/90 dark:bg-indigo-900/30 backdrop-blur-sm border-stayfinder-sage/20 dark:border-purple-900 premium-card"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.user.image ?? undefined} alt={review.user.name} />
                    <AvatarFallback className="bg-stayfinder-sage/20 text-stayfinder-forest">
                      {review.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-stayfinder-forest dark:text-white">{review.user.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.listing.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-stayfinder-gold text-stayfinder-gold" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                {review.comment && (
                  <p className="text-sm italic text-stayfinder-forest/80 dark:text-slate-300">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
