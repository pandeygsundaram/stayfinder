import Link from "next/link"
import { Home, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-stayfinder-sage/20 dark:border-purple-900 bg-white/80 dark:bg-indigo-950/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-500 dark:to-pink-500 rounded-full opacity-90 blur-[1px]" />
                <div className="absolute inset-[2px] bg-white dark:bg-indigo-950 rounded-full flex items-center justify-center">
                  <Home className="w-4 h-4 text-stayfinder-forest dark:text-purple-400" />
                </div>
              </div>
              <span className="font-caveat text-2xl font-bold bg-gradient-to-r from-stayfinder-forest to-stayfinder-sage dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                StayFinder
              </span>
            </Link>
            <p className="text-sm text-stayfinder-forest/70 dark:text-slate-300">
              Find your cozy nook away from home. Magical stays in enchanting locations.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-stayfinder-forest/60 hover:text-stayfinder-forest dark:hover:text-purple-400"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-stayfinder-forest/60 hover:text-stayfinder-forest dark:hover:text-purple-400"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-stayfinder-forest/60 hover:text-stayfinder-forest dark:hover:text-purple-400"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-stayfinder-forest/60 hover:text-stayfinder-forest dark:hover:text-purple-400"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stayfinder-forest dark:text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stayfinder-forest dark:text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Safety Information
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  COVID-19 Resources
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stayfinder-forest dark:text-white">Hosting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Try Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Host Resources
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-stayfinder-forest/70 hover:text-stayfinder-forest dark:text-slate-300 dark:hover:text-purple-400"
                >
                  Host Responsibly
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stayfinder-sage/20 dark:border-purple-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stayfinder-forest/60 dark:text-slate-400">
            © {new Date().getFullYear()} StayFinder, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-stayfinder-forest/60 dark:text-slate-400">
            <Link href="#" className="hover:text-stayfinder-forest dark:hover:text-purple-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-stayfinder-forest dark:hover:text-purple-400">
              Terms
            </Link>
            <Link href="#" className="hover:text-stayfinder-forest dark:hover:text-purple-400">
              Sitemap
            </Link>
            <div className="text-xs">Inspired by Studio Ghibli</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
