"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  X,
  Home,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Shield,
  Coffee,
  Waves,
  TreePine,
  Mountain,
  Camera,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface PropertyFormData {
  // Basic Info
  title: string
  description: string
  propertyType: string

  // Location
  address: string
  city: string
  state: string
  country: string
  zipCode: string

  // Details
  guests: number
  bedrooms: number
  bathrooms: number

  // Amenities
  amenities: string[]

  // Images
  images: File[]
  imageLinks: string[]

  // Pricing
  basePrice: number
  cleaningFee: number

  // House Rules
  checkInTime: string
  checkOutTime: string
  houseRules: string[]
}

const propertyTypes = [
  { value: "cottage", label: "Cottage", icon: Home },
  { value: "villa", label: "Villa", icon: Home },
  { value: "castle", label: "Castle", icon: Home },
  { value: "treehouse", label: "Tree House", icon: TreePine },
  { value: "cabin", label: "Cabin", icon: Mountain },
  { value: "apartment", label: "Apartment", icon: Home },
]

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Free parking", icon: Car },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "tv", label: "TV", icon: Tv },
  { id: "ac", label: "Air conditioning", icon: Wind },
  { id: "safe", label: "Safe", icon: Shield },
  { id: "coffee", label: "Coffee maker", icon: Coffee },
  { id: "pool", label: "Pool", icon: Waves },
  { id: "garden", label: "Garden", icon: TreePine },
  { id: "mountain_view", label: "Mountain view", icon: Mountain },
]

const defaultHouseRules = ["No smoking", "No pets", "No parties or events", "Quiet hours: 10 PM - 8 AM"]

export default function AddPropertyPage() {
  const [imageLink, setImageLink] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    images: [],
    imageLinks: [],
    basePrice: 0,
    cleaningFee: 0,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    houseRules: [...defaultHouseRules],
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof PropertyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10), // Max 10 images
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addCustomRule = () => {
    const newRule = prompt("Enter a custom house rule:")
    if (newRule && newRule.trim()) {
      setFormData((prev) => ({
        ...prev,
        houseRules: [...prev.houseRules, newRule.trim()],
      }))
    }
  }

  const removeRule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      houseRules: prev.houseRules.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    try {
      // Here you would typically upload images first, then create the listing
      console.log("Submitting property:", formData);

      // Prepare your data for the backend
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.basePrice,
        location: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.zipCode}`,
        latitude: 0.0, // update this if you're collecting lat/lng
        longitude: 0.0,
        images: formData.imageLinks, // should be an array of image URLs
      };

      // Get token (assuming you stored it in localStorage after login)
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.msg || "Failed to create listing");
      }

      const data = await res.json();
      console.log("Listing created successfully:", data);

      // Redirect to host dashboard or property details page
      window.location.href = "/host";

    } catch (error: any) {
      console.error("Error creating property:", error.message || error);
      alert("Failed to create listing. Please try again.");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">Basic Information</CardTitle>
              <p className="text-muted-foreground">Tell us about your magical property</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Enchanted Forest Cottage"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property's magical features and what makes it special..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Property Type *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.propertyType === type.value
                        ? "border-stayfinder-forest bg-stayfinder-cream/50 dark:bg-purple-900/30"
                        : "border-stayfinder-sage/30 hover:border-stayfinder-sage/50"
                        }`}
                      onClick={() => updateFormData("propertyType", type.value)}
                    >
                      <type.icon className="w-6 h-6 mb-2 text-stayfinder-sage" />
                      <div className="font-medium text-sm">{type.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">Location</CardTitle>
              <p className="text-muted-foreground">Where is your magical place located?</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  placeholder="123 Magical Lane"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enchanted City"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    placeholder="Magical State"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                    <SelectTrigger className="border-stayfinder-sage/30 focus:border-stayfinder-forest">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="nz">New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">Property Details</CardTitle>
              <p className="text-muted-foreground">Tell us about the space</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Guests</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("guests", Math.max(1, formData.guests - 1))}
                      disabled={formData.guests <= 1}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{formData.guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("guests", Math.min(20, formData.guests + 1))}
                      disabled={formData.guests >= 20}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("bedrooms", Math.max(1, formData.bedrooms - 1))}
                      disabled={formData.bedrooms <= 1}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{formData.bedrooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("bedrooms", Math.min(10, formData.bedrooms + 1))}
                      disabled={formData.bedrooms >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("bathrooms", Math.max(1, formData.bathrooms - 1))}
                      disabled={formData.bathrooms <= 1}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-8 text-center">{formData.bathrooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateFormData("bathrooms", Math.min(10, formData.bathrooms + 1))}
                      disabled={formData.bathrooms >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map((amenity) => (
                    <div
                      key={amenity.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.amenities.includes(amenity.id)
                        ? "border-stayfinder-forest bg-stayfinder-cream/50 dark:bg-purple-900/30"
                        : "border-stayfinder-sage/30 hover:border-stayfinder-sage/50"
                        }`}
                      onClick={() => toggleAmenity(amenity.id)}
                    >
                      <amenity.icon className="w-5 h-5 mb-2 text-stayfinder-sage" />
                      <div className="text-sm font-medium">{amenity.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">Photos</CardTitle>
              <p className="text-muted-foreground">Show off your magical space (up to 10 photos)</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-stayfinder-sage/30 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-stayfinder-sage" />
                  <div className="text-lg font-medium mb-2">Upload Photos</div>
                  <div className="text-sm text-muted-foreground">Drag and drop or click to select images</div>
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="url"
                  placeholder="Paste image URL here"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!imageLink.trim()) return;
                    setFormData((prev) => ({
                      ...prev,
                      imageLinks: [...prev.imageLinks, imageLink.trim()],
                    }));
                    setImageLink(""); // clear the field
                  }}
                >
                  Add Link
                </Button>
              </div>
              <Separator />

              {(formData.images.length > 0 || formData.imageLinks.length > 0) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Files */}
                  {formData.images.map((image, index) => (
                    <div key={`file-${index}`} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-stayfinder-sage/20">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Property image ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-stayfinder-forest text-white">Cover Photo</Badge>
                      )}
                    </div>
                  ))}

                  {/* Links */}
                  {formData.imageLinks.map((link, index) => (
                    <div key={`link-${index}`} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-stayfinder-sage/20">
                        <Image
                          src={link}
                          alt={`Linked image ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            imageLinks: prev.imageLinks.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-stayfinder-forest text-white">Cover Photo</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">Pricing</CardTitle>
              <p className="text-muted-foreground">Set your rates</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price per Night *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="basePrice"
                      type="number"
                      placeholder="120"
                      value={formData.basePrice || ""}
                      onChange={(e) => updateFormData("basePrice", Number(e.target.value))}
                      className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cleaningFee">Cleaning Fee</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="cleaningFee"
                      type="number"
                      placeholder="25"
                      value={formData.cleaningFee || ""}
                      onChange={(e) => updateFormData("cleaningFee", Number(e.target.value))}
                      className="pl-10 border-stayfinder-sage/30 focus:border-stayfinder-forest"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stayfinder-cream/30 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Pricing Preview</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base price per night</span>
                    <span>${formData.basePrice || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${formData.cleaningFee || 0}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total for 3 nights</span>
                    <span>${(formData.basePrice || 0) * 3 + (formData.cleaningFee || 0)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card className="border-stayfinder-sage/20 premium-card">
            <CardHeader>
              <CardTitle className="text-stayfinder-forest dark:text-white">House Rules & Check-in</CardTitle>
              <p className="text-muted-foreground">Set your guidelines and check-in times</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Check-in Time</Label>
                  <Input
                    id="checkInTime"
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => updateFormData("checkInTime", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOutTime">Check-out Time</Label>
                  <Input
                    id="checkOutTime"
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => updateFormData("checkOutTime", e.target.value)}
                    className="border-stayfinder-sage/30 focus:border-stayfinder-forest"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>House Rules</Label>
                  <Button variant="outline" size="sm" onClick={addCustomRule}>
                    Add Rule
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.houseRules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-stayfinder-sage/20 rounded-lg"
                    >
                      <span className="text-sm">{rule}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950">

      <main className="container px-4 md:px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/host">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Host Dashboard
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-caveat text-4xl font-bold mb-2 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Add Your Magical Property ✨
          </h1>
          <p className="text-stayfinder-forest/80 dark:text-slate-300">
            Share your enchanting space with fellow travelers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-stayfinder-sage/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white"
              >
                Publish Property
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage text-white"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
