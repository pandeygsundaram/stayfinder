"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Shield,
  Heart,
  Share,
  CalendarIcon,
  Users,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { format } from "date-fns"

const property = {
  id: 1,
  title: "Enchanted Forest Cottage",
  location: "Miyazaki Woods, Japan",
  price: 120,
  rating: 4.9,
  reviews: 124,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  tags: ["Forest View", "Hot Spring"],
  guests: 4,
  bedrooms: 2,
  bathrooms: 1,
  type: "Cottage",
  description:
    "Step into a magical world where nature and comfort blend seamlessly. This enchanted cottage is nestled deep in the mystical Miyazaki Woods, offering a perfect retreat for those seeking tranquility and wonder. Wake up to the gentle sounds of the forest and enjoy your morning tea while watching the sunrise through ancient trees.",
  amenities: [
    { icon: Wifi, name: "Free WiFi" },
    { icon: Car, name: "Free parking" },
    { icon: Utensils, name: "Kitchen" },
    { icon: Tv, name: "TV" },
    { icon: Wind, name: "Air conditioning" },
    { icon: Shield, name: "Safe" },
  ],
  host: {
    name: "Totoro",
    avatar: "/placeholder.svg?height=60&width=60",
    joinDate: "2019",
    reviews: 342,
    rating: 4.8,
    verified: true,
  },
  reviews: [
    {
      id: 1,
      user: "Sophie",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely magical! The cottage exceeded all expectations. Waking up in the forest felt like being in a Ghibli film.",
    },
    {
      id: 2,
      user: "Kiki",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      comment: "Perfect for a peaceful getaway. The hot spring was incredible and the host was so welcoming.",
    },
  ],
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * property.price
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
      <Navbar />

      <main className="container px-4 md:px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/search">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </Link>
        </Button>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="font-caveat text-3xl md:text-4xl font-bold text-stayfinder-forest dark:text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                  <span className="font-medium">{property.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2">
            <Image
              src={property.images[selectedImage] || "/placeholder.svg"}
              alt={property.title}
              width={600}
              height={400}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setSelectedImage(0)}
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} ${index + 2}`}
                width={300}
                height={300}
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(index + 1)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="p-6 border-stayfinder-sage/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-stayfinder-forest dark:text-white">
                  {property.type} hosted by {property.host.name}
                </h2>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={property.host.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                <span>{property.guests} guests</span>
                <span>•</span>
                <span>{property.bedrooms} bedrooms</span>
                <span>•</span>
                <span>{property.bathrooms} bathrooms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-stayfinder-cream dark:bg-purple-900/30 text-stayfinder-forest dark:text-purple-300 border-stayfinder-sage/30 dark:border-purple-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 border-stayfinder-sage/20">
              <h3 className="text-lg font-semibold mb-3 text-stayfinder-forest dark:text-white">About this place</h3>
              <p className="text-stayfinder-forest/80 dark:text-slate-300 leading-relaxed">{property.description}</p>
            </Card>

            {/* Amenities */}
            <Card className="p-6 border-stayfinder-sage/20">
              <h3 className="text-lg font-semibold mb-4 text-stayfinder-forest dark:text-white">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <amenity.icon className="h-5 w-5 text-stayfinder-sage" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6 border-stayfinder-sage/20">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-stayfinder-gold text-stayfinder-gold" />
                <h3 className="text-lg font-semibold text-stayfinder-forest dark:text-white">
                </h3>
              </div>
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <div key={review.id} className="border-b border-stayfinder-sage/20 pb-4 last:border-b-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{review.user}</div>
                        <div className="text-xs text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex ml-auto">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? "fill-stayfinder-gold text-stayfinder-gold" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-stayfinder-forest/80 dark:text-slate-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-stayfinder-sage/20 sticky top-24">
              <div className="mb-4">
                <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                  ${property.price} <span className="text-base font-normal text-muted-foreground">/ night</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "MMM dd") : "Check in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "MMM dd") : "Check out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 guest</SelectItem>
                    <SelectItem value="2">2 guests</SelectItem>
                    <SelectItem value="3">3 guests</SelectItem>
                    <SelectItem value="4">4 guests</SelectItem>
                  </SelectContent>
                </Select>

                {checkIn && checkOut && (
                  <div className="space-y-2 pt-4 border-t border-stayfinder-sage/20">
                    <div className="flex justify-between text-sm">
                      <span>
                        ${property.price} x{" "}
                        {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                      </span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${Math.round(calculateTotal() * 0.1)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal() + Math.round(calculateTotal() * 0.1)}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage hover:from-stayfinder-forest/90 hover:to-stayfinder-sage/90 text-white"
                  disabled={!checkIn || !checkOut}
                  asChild
                >
                  <Link
                    href={`/booking/${property.id}?checkin=${checkIn?.toISOString()}&checkout=${checkOut?.toISOString()}&guests=${guests}`}
                  >
                    Reserve
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
