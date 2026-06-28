import type React from "react"
import "@/app/globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Providers from "@/stores/providers"
import ToasterProvider from "@/components/ToasterProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata = {
  title: "StayFinder — Book Easy, Stay Happy",
  description:
    "Discover unique stays in amazing locations. Book with confidence and enjoy every moment.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>
            <ToasterProvider />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
