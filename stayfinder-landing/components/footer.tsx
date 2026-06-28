import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-[#090C0E] text-white pt-20 pb-12 px-6 md:px-12 rounded-t-[2.5rem] overflow-hidden">
      <div className="max-w-[85rem] mx-auto relative z-10">
        {/* Brand */}
        <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <Link href="/" className="font-serif text-4xl md:text-5xl tracking-widest text-white">
            STAY<span className="font-bold italic">FINDER</span>
          </Link>
          <p className="max-w-xs text-sm text-gray-400 leading-relaxed">
            Find unique stays in amazing locations. Book with confidence, every time.
          </p>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-5">
            <Link href="/search" className="hover:text-white transition">EXPLORE</Link>
            <Link href="/host" className="hover:text-white transition">BECOME A HOST</Link>
          </div>
          <div className="flex flex-col gap-5">
            <Link href="/dashboard" className="hover:text-white transition">DASHBOARD</Link>
            <Link href="/bookings" className="hover:text-white transition">MY BOOKINGS</Link>
          </div>
          <div className="flex flex-col gap-5">
            <Link href="#" className="hover:text-white transition">ABOUT US</Link>
            <Link href="#" className="hover:text-white transition">HELP CENTER</Link>
            <Link href="#" className="hover:text-white transition">CAREERS</Link>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition"><Youtube className="h-4 w-4" /></a>
            </div>
            <a href="#" className="hover:text-white transition">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition">TWITTER / X</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600">
          <span>© {new Date().getFullYear()} StayFinder, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Atmospheric glow */}
      <div className="absolute bottom-0 left-0 w-full h-80 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0c595f] via-[#090C0E] to-transparent" />
    </footer>
  )
}
