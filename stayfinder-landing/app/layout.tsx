import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Providers from "@/atoms/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StayFinder - Find Your Magical Stay",
  description:
    "Discover magical stays in enchanting locations with StayFinder, an Airbnb-style platform with a Studio Ghibli-inspired aesthetic.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
