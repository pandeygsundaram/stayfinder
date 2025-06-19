import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { FeaturedListings } from "@/components/featured-listings"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stayfinder-cream to-white dark:from-indigo-950 dark:to-purple-950 transition-colors duration-500">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <FeaturedListings />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
