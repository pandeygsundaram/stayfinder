"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Download,
  MessageSquare,
  ArrowLeft,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const booking = {
  id: "SF-2024-001",
  status: "confirmed",
  property: {
    title: "Enchanted Forest Cottage",
    location: "Miyazaki Woods, Japan",
    image: "/placeholder.svg?height=300&width=400",
    address: "123 Forest Path, Miyazaki Woods, Japan 123-4567",
  },
  dates: {
    checkIn: "February 15, 2024",
    checkOut: "February 18, 2024",
    nights: 3,
  },
  guests: 2,
  host: {
    name: "Totoro",
    phone: "+81 123-456-7890",
    email: "totoro@stayfinder.com",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  pricing: {
    basePrice: 120,
    nights: 3,
    subtotal: 360,
    serviceFee: 36,
    taxes: 28,
    total: 424,
  },
  checkInInstructions:
    "Welcome to our magical cottage! Check-in is available from 3:00 PM. You'll find the key in the hollow of the old oak tree by the front door. Look for the small wooden sign with a forest spirit carved into it.",
  houseRules: [
    "Check-in: 3:00 PM - 9:00 PM",
    "Check-out: 11:00 AM",
    "No smoking anywhere on the property",
    "No pets allowed",
    "Quiet hours: 10:00 PM - 8:00 AM",
    "Maximum 2 guests",
  ],
}

export default function BookingConfirmationPage({ params }: { params: { id: string } }) {
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

        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Booking Confirmed! ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300 mb-4">
            Your magical stay is all set. We can't wait for you to experience the wonder!
          </p>
          <Badge className="bg-stayfinder-sage/20 text-stayfinder-forest border-stayfinder-sage/30">
            Booking ID: {booking.id}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={booking.property.image || "/placeholder.svg"}
                      alt={booking.property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-stayfinder-forest dark:text-white mb-2">
                      {booking.property.title}
                    </h2>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booking.property.location}
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.property.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-stayfinder-sage" />
                    <div>
                      <div className="font-medium text-stayfinder-forest dark:text-white">Check-in</div>
                      <div className="text-sm text-muted-foreground">{booking.dates.checkIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-stayfinder-sage" />
                    <div>
                      <div className="font-medium text-stayfinder-forest dark:text-white">Check-out</div>
                      <div className="text-sm text-muted-foreground">{booking.dates.checkOut}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-stayfinder-sage" />
                    <div>
                      <div className="font-medium text-stayfinder-forest dark:text-white">Guests</div>
                      <div className="text-sm text-muted-foreground">{booking.guests} guests</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-stayfinder-sage" />
                  <div>
                    <div className="font-medium text-stayfinder-forest dark:text-white">Duration</div>
                    <div className="text-sm text-muted-foreground">{booking.dates.nights} nights</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Check-in Instructions */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Check-in Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stayfinder-forest/80 dark:text-slate-300 leading-relaxed">
                  {booking.checkInInstructions}
                </p>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {booking.houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-stayfinder-sage mt-2 flex-shrink-0" />
                      <span className="text-stayfinder-forest/80 dark:text-slate-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Contact */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Your Host</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stayfinder-sage/20 flex items-center justify-center">
                    <span className="font-semibold text-stayfinder-forest">{booking.host.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-stayfinder-forest dark:text-white">{booking.host.name}</div>
                    <div className="text-sm text-muted-foreground">Host</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`tel:${booking.host.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Host
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`mailto:${booking.host.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email Host
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Breakdown */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Pricing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    ${booking.pricing.basePrice} x {booking.pricing.nights} nights
                  </span>
                  <span>${booking.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${booking.pricing.serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${booking.pricing.taxes}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-stayfinder-forest dark:text-white">
                  <span>Total</span>
                  <span>${booking.pricing.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Confirmation
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/bookings">
                    <Calendar className="w-4 h-4 mr-2" />
                    View All Bookings
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-stayfinder-sage/20 premium-card">
              <CardHeader>
                <CardTitle className="text-stayfinder-forest dark:text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Our support team is here to help with any questions about your booking.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
