"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])

  // Use the correct theme value
  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light"

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Rich background texture for light mode */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>

        {/* Day clouds or night stars based on theme */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-xl bg-stayfinder-sage/40 dark:bg-purple-300/20 ${
                i % 2 === 0 ? "animate-float-slow" : "animate-float"
              }`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 60 + 30}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: currentTheme === "dark" ? 0.2 : 0.7,
              }}
            />
          ))}
        </div>

        {/* Hills for light mode - richer colors */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-64 bg-gradient-to-t from-stayfinder-sage/20 to-transparent dark:opacity-0 transition-opacity duration-1000" />

        {/* Stars for dark mode */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute h-1 w-1 rounded-full bg-white dark:animate-twinkle hidden dark:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_0.8fr]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-caveat text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                Find your cozy nook away from home ✨
              </h1>
              <p className="max-w-[600px] text-stayfinder-forest/80 md:text-xl dark:text-slate-300">
                Discover magical stays in enchanting locations. Book unique homes and create unforgettable memories.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-500 dark:to-pink-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button className="relative bg-white dark:bg-indigo-950 text-stayfinder-forest dark:text-purple-400 border border-stayfinder-sage/30 dark:border-purple-800 hover:bg-stayfinder-cream dark:hover:bg-indigo-900 px-8 h-12 shadow-premium hover:shadow-premium-hover">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Stays
                </Button>
              </div>
              <Button
                variant="outline"
                className="h-12 border-stayfinder-sage/50 text-stayfinder-forest hover:bg-stayfinder-cream/50 hover:text-stayfinder-forest dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/50"
              >
                Become a Host
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-square">
              {/* Ghibli-style house illustration with premium colors */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-stayfinder-sage/30 dark:border-purple-800 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-stayfinder-sky/30 to-stayfinder-sage/20 dark:from-indigo-900 dark:to-purple-900" />

                {/* House */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2">
                  <div className="absolute bottom-0 w-full h-3/4 bg-stayfinder-sand dark:bg-indigo-800 rounded-t-xl" />
                  <div
                    className="absolute bottom-[75%] left-1/2 -translate-x-1/2 w-4/5 h-1/4 bg-stayfinder-terracotta dark:bg-purple-700"
                    style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
                  />

                  {/* Windows */}
                  <div className="absolute bottom-[30%] left-[20%] w-[15%] h-[20%] bg-stayfinder-sky dark:bg-purple-400 border-2 border-stayfinder-sand dark:border-purple-600 rounded-sm" />
                  <div className="absolute bottom-[30%] right-[20%] w-[15%] h-[20%] bg-stayfinder-sky dark:bg-purple-400 border-2 border-stayfinder-sand dark:border-purple-600 rounded-sm" />

                  {/* Door */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-stayfinder-forest dark:bg-indigo-600 rounded-t-lg" />
                </div>

                {/* Trees */}
                <div className="absolute bottom-[10%] left-[15%] w-[15%] aspect-[1/2]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-stayfinder-ochre dark:bg-purple-900" />
                  <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-full aspect-square bg-stayfinder-sage dark:bg-emerald-700 rounded-full" />
                </div>
                <div className="absolute bottom-[5%] right-[10%] w-[20%] aspect-[1/2]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-[30%] bg-stayfinder-ochre dark:bg-purple-900" />
                  <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-full aspect-square bg-stayfinder-forest dark:bg-emerald-800 rounded-full" />
                </div>

                {/* Sun/Moon */}
                <div
                  className={`absolute top-[15%] right-[20%] w-[15%] aspect-square rounded-full ${
                    currentTheme === "dark" ? "bg-slate-200 animate-pulse" : "bg-stayfinder-gold animate-pulse"
                  }`}
                />

                {/* Clouds/Stars */}
                {currentTheme === "dark" ? (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={`floating-${i}`}
                        className="absolute h-1 w-1 bg-white rounded-full animate-float-slow"
                        style={{
                          top: `${10 + Math.random() * 30}%`,
                          left: `${10 + Math.random() * 80}%`,
                          opacity: 0.7,
                          animationDelay: `${Math.random() * 3}s`,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <div className="absolute top-[25%] left-[20%] w-[25%] h-[10%] bg-white rounded-full blur-sm" />
                    <div className="absolute top-[15%] left-[30%] w-[20%] h-[8%] bg-white rounded-full blur-sm" />
                  </>
                )}

                {/* Fireflies in dark mode */}
                {currentTheme === "dark" &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`firefly-${i}`}
                      className="absolute h-1 w-1 bg-yellow-300 rounded-full animate-firefly"
                      style={{
                        bottom: `${10 + Math.random() * 40}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
