"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

interface MapMarker {
  position: {
    lat: number
    lng: number
  }
  title: string
  info?: string
  type?: "property" | "poi" // Point of interest
}

interface EnhancedLeafletMapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: MapMarker[]
  className?: string
  showControls?: boolean
  allowFullscreen?: boolean
}

export function EnhancedLeafletMap({
  center,
  zoom = 13,
  markers = [],
  className,
  showControls = true,
  allowFullscreen = true,
}: EnhancedLeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
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
        const map = L.map(mapRef.current!, {
          zoomControl: showControls,
          attributionControl: true,
        }).setView([center.lat, center.lng], zoom)

        // Add tile layer with custom styling
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map)

        // Add markers with custom icons
        markers.forEach((marker) => {
          const isProperty = marker.type === "property" || !marker.type

          const customIcon = L.divIcon({
            html: `
              <div class="relative animate-bounce">
                <div class="w-10 h-10 ${
                  isProperty
                    ? "bg-gradient-to-r from-green-600 to-green-700"
                    : "bg-gradient-to-r from-blue-600 to-blue-700"
                } rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                  <span class="text-white text-lg">${isProperty ? "🏠" : "📍"}</span>
                </div>
                <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent ${
                  isProperty ? "border-t-green-600" : "border-t-blue-600"
                }"></div>
              </div>
            `,
            className: "custom-marker",
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50],
          })

          const leafletMarker = L.marker([marker.position.lat, marker.position.lng])
            .setIcon(customIcon)
            .addTo(map)
            .bindPopup(
              `
              <div class="p-3 min-w-[200px]">
                <h3 class="font-semibold text-base mb-2 text-stayfinder-forest">${marker.title}</h3>
                ${marker.info ? `<p class="text-sm text-gray-600 mb-2">${marker.info}</p>` : ""}
                <div class="flex items-center text-xs text-gray-500">
                  <MapPin class="w-3 h-3 mr-1" />
                  ${marker.position.lat.toFixed(4)}, ${marker.position.lng.toFixed(4)}
                </div>
              </div>
            `,
              {
                maxWidth: 300,
                className: "custom-popup",
              },
            )

          // Auto-open popup for property markers
          if (isProperty) {
            leafletMarker.openPopup()
          }
        })

        // Add some nearby points of interest (demo data)
        const nearbyPOIs = [
          { lat: center.lat + 0.005, lng: center.lng + 0.005, name: "Forest Trail", type: "🥾" },
          { lat: center.lat - 0.003, lng: center.lng + 0.007, name: "Local Shrine", type: "⛩️" },
          { lat: center.lat + 0.008, lng: center.lng - 0.004, name: "Hot Springs", type: "♨️" },
          { lat: center.lat - 0.006, lng: center.lng - 0.008, name: "Village Market", type: "🏪" },
        ]

        nearbyPOIs.forEach((poi) => {
          const poiIcon = L.divIcon({
            html: `
              <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-300">
                <span class="text-sm">${poi.type}</span>
              </div>
            `,
            className: "poi-marker",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          L.marker([poi.lat, poi.lng])
            .setIcon(poiIcon)
            .addTo(map)
            .bindPopup(`
              <div class="p-2">
                <h4 class="font-medium text-sm">${poi.name}</h4>
                <p class="text-xs text-gray-500">Nearby attraction</p>
              </div>
            `)
        })

        // Store map instance
        mapInstanceRef.current = map

        // Add custom styling
        const mapContainer = mapRef.current
        if (mapContainer) {
          mapContainer.style.borderRadius = "0.5rem"
          mapContainer.style.overflow = "hidden"
        }

        // Add custom CSS for popups
        const style = document.createElement("style")
        style.textContent = `
          .custom-popup .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          .custom-popup .leaflet-popup-tip {
            background: white;
          }
          .poi-marker {
            transition: transform 0.2s ease;
          }
          .poi-marker:hover {
            transform: scale(1.1);
          }
        `
        document.head.appendChild(style)
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
  }, [isLoaded, center, zoom, markers, showControls])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Trigger map resize after fullscreen toggle
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize()
      }
    }, 100)
  }

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
          <p className="text-muted-foreground">Loading interactive map...</p>
        </div>
      </Card>
    )
  }

  return (
    <div className={`relative w-full h-full ${className} ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: isFullscreen ? "100vh" : "300px" }} />

      {/* Fullscreen toggle */}
      {allowFullscreen && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      )}

      {/* Map info */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        🗺️ Interactive Map • Free & Open Source
      </div>

      {/* Legend */}
      <div className="absolute top-2 left-2 bg-white/90 p-2 rounded-lg shadow-md text-xs">
        <div className="flex items-center gap-1 mb-1">
          <span>🏠</span>
          <span>Property</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>Attractions</span>
        </div>
      </div>
    </div>
  )
}
