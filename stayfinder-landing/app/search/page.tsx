"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Filter, Search, Heart, Loader2, } from "lucide-react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { useAuthStore } from "@/stores/authstore"
import { fetchAndEnrichListings, Property } from "./fetchAndEnrich"
import { toggleWishlist } from "../wishlist/wishlist.api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedType, setSelectedType] = useState("Any type")
  const [guests, setGuests] = useState("Any number")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setloading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const { isAuthenticated, user, token, isInitializing } = useAuthStore()
  const [wishlistLoadingId, setWishlistLoadingId] = useState<number | null>(null)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesType = selectedType === "Any type" || property.type === selectedType
    const matchesGuests = guests === "Any number" || property.guests >= Number.parseInt(guests)

    return matchesSearch && matchesPrice && matchesType && matchesGuests
  })

  const handleToggleWishlist = async (propertyId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to wishlist")
      return
    }


    try {
      setWishlistLoadingId(propertyId) // 🌀 show loader on this one

      const updated = [...properties]
      const index = updated.findIndex(p => p.id === propertyId)
      const current = updated[index]

      updated[index] = { ...current, isWishlisted: !current.isWishlisted }
      setProperties(updated)

      if (!current.isWishlisted) {
        current.isWishlisted = false
      }
      await toggleWishlist(propertyId, current.isWishlisted)

    } catch (err) {
      console.error("Toggle wishlist failed", err)
      // Optionally: revert state on failure
    } finally {
      setWishlistLoadingId(null) // ✅ remove loader
    }
  }

  useEffect(() => {
    if (isInitializing) return;

    const fetchProperties = async () => {
      setloading(true)
      const props = await fetchAndEnrichListings(isAuthenticated, token || undefined)
      setProperties(props)
      console.log(props)
      setloading(false)
    }


    fetchProperties()
  }, [isInitializing])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">
        <main className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stayfinder-forest mx-auto mb-4"></div>
              <p className="text-stayfinder-forest/80 dark:text-slate-300">Loading magical stays...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">

      <main className="container px-4 md:px-6 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-caveat text-4xl font-bold mb-4 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Find Your Perfect Stay
          </h1>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search destinations, properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-stayfinder-sage/30 focus:border-stayfinder-forest"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-stayfinder-sage/30 hover:bg-stayfinder-cream/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="p-6 border-stayfinder-sage/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Property Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any type">Any type</SelectItem>
                      <SelectItem value="Cottage">Cottage</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Castle">Castle</SelectItem>
                      <SelectItem value="Tree House">Tree House</SelectItem>
                      <SelectItem value="Ryokan">Ryokan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any number">Any number</SelectItem>
                      <SelectItem value="1">1 guest</SelectItem>
                      <SelectItem value="2">2 guests</SelectItem>
                      <SelectItem value="4">4+ guests</SelectItem>
                      <SelectItem value="6">6+ guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            {filteredProperties.length} magical places found
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-premium premium-card border-stayfinder-sage/20 dark:border-purple-900"
              key={property.id}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 z-10">

                  <Button
                    variant="ghost"
                    size="icon"

                    className="bg-white/80 hover:bg-white cursor-pointer"
                    onClick={(e) => {
                      console.log("Button clicked")
                      e.preventDefault()
                      e.stopPropagation()
                      handleToggleWishlist(property.id)
                    }}
                    disabled={wishlistLoadingId === property.id}
                  >
                    {wishlistLoadingId === property.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    ) : property.isWishlisted ? (
                      <Heart className="h-4 w-4 fill-red-500 text-red-500 transition" />
                    ) : (
                      <Heart className="h-4 w-4 text-gray-700 transition" />
                    )}
                  </Button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div onClick={() => router.push(`/property/${property.id}`)}
                className="group">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-stayfinder-forest dark:text-white">{property.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-stayfinder-gold text-stayfinder-gold mr-1" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {property.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {property.guests} guests • {property.bedrooms} bedrooms • {property.bathrooms} bathrooms
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
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
                </CardContent>

                <CardFooter className="p-4 border-t border-stayfinder-sage/20 dark:border-purple-900 flex items-center justify-between">
                  <div className="font-semibold text-stayfinder-forest dark:text-white">
                    ${property.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{property.reviews} reviews</div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2 text-stayfinder-forest dark:text-white">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
