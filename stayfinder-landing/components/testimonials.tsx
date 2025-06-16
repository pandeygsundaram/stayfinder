import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sophie",
    location: "Tokyo, Japan",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Staying here felt like living in a Ghibli film! The cottage was cozy and magical, surrounded by nature. I never wanted to leave!",
  },
  {
    id: 2,
    name: "Howl",
    location: "Edinburgh, Scotland",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "The attention to detail in this home was extraordinary. From the garden to the interior decor, everything felt enchanted.",
  },
  {
    id: 3,
    name: "Chihiro",
    location: "Portland, USA",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "A truly unique experience! The host was wonderful and the surrounding area was peaceful and beautiful. Perfect for a getaway.",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-stayfinder-cream/50 dark:bg-indigo-950/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-caveat bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              What Guests Are Saying
            </h2>
            <p className="max-w-[700px] text-stayfinder-forest/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-300">
              Stories from travelers who found their magical home away from home.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white/90 dark:bg-indigo-900/30 backdrop-blur-sm border-stayfinder-sage/20 dark:border-purple-900 premium-card"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-stayfinder-sage/20 text-stayfinder-forest">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-stayfinder-forest dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-stayfinder-gold text-stayfinder-gold" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm italic text-stayfinder-forest/80 dark:text-slate-300">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
