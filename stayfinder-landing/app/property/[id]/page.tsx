"use client"

import { useState, useEffect, use } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Coffee,
  Waves,
  TreePine,
  Mountain,
  Check,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { EnhancedLeafletMap } from "@/components/enhanced-leaflet-map"
import { format, differenceInDays } from "date-fns"

interface PropertyData {
  id: number
  title: string
  description: string | null
  location: string
  price: number
  images: { id: number; url: string }[]
  user: { id: number; email: string , name:string}
  bookings: { startDate: string; endDate: string }[]
}

const sampleProperty: PropertyData = {
  id: 1,
  title: "Cozy Mountain Cabin Retreat",
  description: "Escape the chaos and chill in this serene mountain-side wooden cabin. WiFi, fireplace, and vibes included.",
  location: "Manali, Himachal Pradesh",
  price: 4500,
  images: [
    { id: 101, url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 102, url: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 103, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  user: {
    id: 42,
    email: "host@example.com",
    name:"sample"

  },
  bookings: [
    { startDate: "2025-06-20", endDate: "2025-06-25" },
    { startDate: "2025-07-01", endDate: "2025-07-05" },
  ],
}

// Enhanced static data for features not yet in database
const staticPropertyData = {
  rating: 4.9,
  reviews: 124,
  tags: ["Forest View", "Hot Spring", "Pet Friendly"],
  guests: 4,
  bedrooms: 2,
  bathrooms: 1,
  beds: 3,
  type: "Cottage",
  coordinates: {
    lat: 35.6762,
    lng: 139.6503, // Tokyo coordinates as example
  },
  amenities: [
    { icon: Wifi, name: "Free WiFi", available: true },
    { icon: Car, name: "Free parking", available: true },
    { icon: Utensils, name: "Kitchen", available: true },
    { icon: Tv, name: "TV", available: true },
    { icon: Wind, name: "Air conditioning", available: true },
    { icon: Shield, name: "Safe", available: true },
    { icon: Coffee, name: "Coffee maker", available: true },
    { icon: Waves, name: "Hot tub", available: false },
    { icon: TreePine, name: "Garden view", available: true },
    { icon: Mountain, name: "Mountain view", available: false },
  ],
  host: {
    name: "Totoro",
    avatar: "/placeholder.svg?height=60&width=60",
    joinDate: "2019",
    reviews: 342,
    rating: 4.8,
    verified: true,
    responseRate: 95,
    responseTime: "within an hour",
    languages: ["English", "Japanese"],
    about:
      "I'm a forest spirit who loves sharing the magic of nature with travelers. I've been hosting for over 5 years and enjoy helping guests discover the hidden wonders of our enchanted woods.",
  },
  houseRules: [
    "Check-in: 3:00 PM - 9:00 PM",
    "Check-out: 11:00 AM",
    "No smoking anywhere on the property",
    "No pets allowed",
    "Quiet hours: 10:00 PM - 8:00 AM",
    "Maximum 4 guests",
    "No parties or events",
  ],
  safetyFeatures: [
    "Smoke detector",
    "Carbon monoxide detector",
    "Fire extinguisher",
    "First aid kit",
    "Security cameras on property exterior",
  ],
  cancellationPolicy:
    "Free cancellation for 48 hours after booking. Cancel before check-in on Feb 13 for a partial refund.",
  reviewsList: [
    {
      id: 1,
      user: "Sophie",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely magical! The cottage exceeded all expectations. Waking up in the forest felt like being in a Ghibli film. Totoro was an incredible host - so responsive and helpful. The hot spring was the perfect way to unwind after exploring the nearby trails.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Kiki",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Perfect for a peaceful getaway. The hot spring was incredible and the host was so welcoming. Every detail was thoughtfully arranged.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Howl",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Beautiful location and cozy cottage. The forest setting is truly enchanting. Only minor issue was the WiFi was a bit slow, but that added to the digital detox experience!",
      helpful: 5,
    },
  ],
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params) 

  
  const [property, setProperty] = useState<PropertyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/listings/${id}`)

        if (!response.ok) {
          throw new Error("Property not found")
        }

        const data = await response.json()
        console.log(data)
        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !property) return { nights: 0, subtotal: 0, serviceFee: 0, total: 0 }

    const nights = differenceInDays(checkOut, checkIn)
    const subtotal = nights * property.price
    const serviceFee = Math.round(subtotal * 0.1)
    const total = subtotal + serviceFee

    return { nights, subtotal, serviceFee, total }
  }

  const isDateBooked = (date: Date) => {
    if (!property) return false

    return property.bookings.some((booking) => {
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      return date >= start && date <= end
    })
  }

  const toggleWishlist = async () => {
    try {
      const userId = 1 // This would come from auth context
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, listingId: property?.id }),
      })

      if (response.ok) {
        setIsWishlisted(!isWishlisted)
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error)
    }
  }

  const handleReserve = () => {
    if (!checkIn || !checkOut) return

    const searchParams = new URLSearchParams({
      checkin: checkIn.toISOString(),
      checkout: checkOut.toISOString(),
      guests: guests,
    })

    window.location.href = `/booking/${property?.id}?${searchParams}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
        <main className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stayfinder-forest mx-auto mb-4"></div>
              <p className="text-stayfinder-forest/80 dark:text-slate-300">Loading magical property...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
        <main className="container px-4 md:px-6 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold mb-2 text-stayfinder-forest dark:text-white">Property not found</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button asChild className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white">
              <Link href="/search">Back to Search</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const { nights, subtotal, serviceFee, total } = calculateTotal()

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">

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
                  <span className="font-medium">{staticPropertyData.rating}</span>
                  <span className="ml-1">({staticPropertyData.reviews} reviews)</span>
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
              <Button
                variant="outline"
                size="sm"
                onClick={toggleWishlist}
                className={isWishlisted ? "bg-red-50 border-red-200" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2">
            <Image
              src={property.images[selectedImage]?.url || "/placeholder.svg?height=400&width=600"}
              alt={property.title}
              width={600}
              height={400}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(0)}
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={image.id} className="aspect-square">
              <Image
                src={image.url || "/placeholder.svg?height=300&width=300"}
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
                  {staticPropertyData.type} hosted by {property.user.name}
                </h2>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={staticPropertyData.host.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{staticPropertyData.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                <span>{staticPropertyData.guests} guests</span>
                <span>•</span>
                <span>{staticPropertyData.bedrooms} bedrooms</span>
                <span>•</span>
                <span>{staticPropertyData.beds} beds</span>
                <span>•</span>
                <span>{staticPropertyData.bathrooms} bathrooms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {staticPropertyData.tags.map((tag) => (
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

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="host">Host</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Description */}
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-3 text-stayfinder-forest dark:text-white">
                    About this place
                  </h3>
                  <p className="text-stayfinder-forest/80 dark:text-slate-300 leading-relaxed">
                    {property.description ||
                      "Welcome to our enchanted forest cottage, where magic meets comfort. Nestled among ancient trees, this cozy retreat offers the perfect escape from the modern world. Wake up to the sound of birds singing and enjoy your morning coffee while watching the forest come alive. The cottage features rustic charm with modern amenities, including a private hot spring where you can soak under the stars."}
                  </p>
                </Card>

                {/* House Rules */}
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-4 text-stayfinder-forest dark:text-white">House Rules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {staticPropertyData.houseRules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-stayfinder-sage mt-2 flex-shrink-0" />
                        <span className="text-sm text-stayfinder-forest/80 dark:text-slate-300">{rule}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Safety Features */}
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-4 text-stayfinder-forest dark:text-white">Safety Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {staticPropertyData.safetyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-stayfinder-sage" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Cancellation Policy */}
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-3 text-stayfinder-forest dark:text-white">
                    Cancellation Policy
                  </h3>
                  <p className="text-sm text-stayfinder-forest/80 dark:text-slate-300">
                    {staticPropertyData.cancellationPolicy}
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-4 text-stayfinder-forest dark:text-white">
                    What this place offers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {staticPropertyData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <amenity.icon
                          className={`h-5 w-5 ${amenity.available ? "text-stayfinder-sage" : "text-gray-400"}`}
                        />
                        <span className={`text-sm ${amenity.available ? "" : "line-through text-gray-400"}`}>
                          {amenity.name}
                        </span>
                        {amenity.available ? (
                          <Check className="h-4 w-4 text-green-500 ml-auto" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <Card className="p-6 border-stayfinder-sage/20">
                  <h3 className="text-lg font-semibold mb-4 text-stayfinder-forest dark:text-white">Where you'll be</h3>
                  <div className="mb-4">
                    <p className="text-stayfinder-forest/80 dark:text-slate-300 mb-4">{property.location}</p>
                    <div className="h-96 rounded-lg overflow-hidden border border-stayfinder-sage/20">
                      <EnhancedLeafletMap
                        center={staticPropertyData.coordinates}
                        zoom={15}
                        markers={[
                          {
                            position: staticPropertyData.coordinates,
                            title: property.title,
                            info: property.location,
                            type: "property",
                          },
                        ]}
                        showControls={true}
                        allowFullscreen={true}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      <strong>Getting around:</strong> This peaceful location is perfect for nature lovers. The nearest
                      train station is a 15-minute walk through scenic forest paths. Local hiking trails are accessible
                      directly from the property.
                    </p>
                    <p>
                      <strong>Nearby attractions:</strong> Ancient shrine (5 min walk), Forest hiking trails (on
                      property), Local hot springs (10 min drive), Traditional village market (20 min walk).
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="p-6 border-stayfinder-sage/20">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 fill-stayfinder-gold text-stayfinder-gold" />
                    <h3 className="text-lg font-semibold text-stayfinder-forest dark:text-white">
                      {staticPropertyData.rating} • {staticPropertyData.reviews} reviews
                    </h3>
                  </div>

                  {/* Review Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-stayfinder-cream/30 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">4.9</div>
                      <div className="text-xs text-muted-foreground">Cleanliness</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">4.8</div>
                      <div className="text-xs text-muted-foreground">Communication</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">4.9</div>
                      <div className="text-xs text-muted-foreground">Location</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {staticPropertyData.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-stayfinder-sage/20 pb-6 last:border-b-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
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
                                className={`h-3 w-3 ${i < review.rating
                                    ? "fill-stayfinder-gold text-stayfinder-gold"
                                    : "text-muted-foreground"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-stayfinder-forest/80 dark:text-slate-300 mb-2">{review.comment}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            👍 Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="host" className="space-y-6">
                <Card className="p-6 border-stayfinder-sage/20">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={staticPropertyData.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xl">{staticPropertyData.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-stayfinder-forest dark:text-white">
                        {property.user.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Host since {staticPropertyData.host.joinDate}</span>
                        {staticPropertyData.host.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-stayfinder-cream/30 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-stayfinder-forest dark:text-white">
                        {staticPropertyData.host.reviews}
                      </div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                    <div className="text-center p-3 bg-stayfinder-cream/30 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-stayfinder-forest dark:text-white">
                        {staticPropertyData.host.rating}★
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center p-3 bg-stayfinder-cream/30 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-stayfinder-forest dark:text-white">
                        {staticPropertyData.host.responseRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Response rate</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-stayfinder-forest dark:text-white">About</h4>
                      <p className="text-sm text-stayfinder-forest/80 dark:text-slate-300">
                        {staticPropertyData.host.about}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-stayfinder-forest dark:text-white">Host details</h4>
                      <div className="space-y-2 text-sm">
                        <div>Response rate: {staticPropertyData.host.responseRate}%</div>
                        <div>Response time: {staticPropertyData.host.responseTime}</div>
                        <div>Languages: {staticPropertyData.host.languages.join(", ")}</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Contact Host
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-stayfinder-sage/20 sticky top-24">
              <div className="mb-4">
                <div className="text-2xl font-bold text-stayfinder-forest dark:text-white">
                  ${property.price} <span className="text-base font-normal text-muted-foreground">/ night</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-stayfinder-gold text-stayfinder-gold" />
                  <span className="text-sm font-medium">{staticPropertyData.rating}</span>
                  <span className="text-sm text-muted-foreground">({staticPropertyData.reviews} reviews)</span>
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
                        disabled={(date) => date < new Date() || isDateBooked(date)}
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
                        disabled={(date) => date < new Date() || (checkIn && date <= checkIn) || isDateBooked(date)}
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

                {checkIn && checkOut && nights > 0 && (
                  <div className="space-y-2 pt-4 border-t border-stayfinder-sage/20">
                    <div className="flex justify-between text-sm">
                      <span>
                        ${property.price} x {nights} nights
                      </span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage hover:from-stayfinder-forest/90 hover:to-stayfinder-sage/90 text-white"
                  disabled={!checkIn || !checkOut || nights <= 0}
                  onClick={handleReserve}
                >
                  Reserve
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
