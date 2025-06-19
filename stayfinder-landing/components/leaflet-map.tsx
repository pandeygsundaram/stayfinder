"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface MapMarker {
  position: {
    lat: number
    lng: number
  }
  title: string
  info?: string
}

interface LeafletMapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: MapMarker[]
  className?: string
}

export function LeafletMap({ center, zoom = 13, markers = [], className }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = await import("leaflet")

        // Import Leaflet CSS
        if (typeof window !== "undefined") {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }

        setIsLoaded(true)
        return L
      } catch (err) {
        setError("Failed to load map")
        return null
      }
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    const initMap = async () => {
      try {
        const L = await import("leaflet")

        // Fix for default markers in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        // Create map instance
        const map = L.map(mapRef.current!).setView([center.lat, center.lng], zoom)

        // Add tile layer (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map)

        // Add markers
        markers.forEach((marker) => {
          const leafletMarker = L.marker([marker.position.lat, marker.position.lng])
            .addTo(map)
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold text-sm mb-1">${marker.title}</h3>
                ${marker.info ? `<p class="text-xs text-gray-600">${marker.info}</p>` : ""}
              </div>
            `)

          // Custom marker icon for StayFinder
          const customIcon = L.divIcon({
            html: `
              <div class="relative">
                <div class="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span class="text-white text-sm">🏠</span>
                </div>
                <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
              </div>
            `,
            className: "custom-marker",
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40],
          })

          leafletMarker.setIcon(customIcon)
        })

        // Store map instance
        mapInstanceRef.current = map

        // Add custom styling
        const mapContainer = mapRef.current
        if (mapContainer) {
          mapContainer.style.borderRadius = "0.5rem"
          mapContainer.style.overflow = "hidden"
        }
      } catch (err) {
        setError("Failed to initialize map")
      }
    }

    initMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isLoaded, center, zoom, markers])

  if (error) {
    return (
      <Card className="p-8 text-center border-stayfinder-sage/20">
        <div className="text-muted-foreground">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Map temporarily unavailable</p>
          <p className="text-sm mt-1">
            Location: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
          </p>
        </div>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className="p-8 text-center border-stayfinder-sage/20">
        <div className="animate-pulse">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }} />

      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Interactive Map powered by Leaflet & OpenStreetMap
      </div>
    </div>
  )
}
