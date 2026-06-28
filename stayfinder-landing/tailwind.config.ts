import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "ui-serif", "Georgia", "serif"],
        // remap font-caveat to Playfair Display (editorial serif replaces handwriting)
        caveat: ["var(--font-playfair)", "Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        stayfinder: {
          gold: "#D4AF37",       // star ratings — kept
          cream: "#FFFDFC",      // warm off-white (hotelgoo bg)
          sage: "#F04C33",       // red accent (hotelgoo CTA red)
          forest: "#111111",     // near-black (hotelgoo dark text)
          terracotta: "#C66B3D", // warm orange accent
          ochre: "#D68C45",      // amber highlight
          navy: "#0c595f",       // hotelgoo teal (pool overlay)
          sky: "#F7F6F2",        // warm card surface (hotelgoo card bg)
          sand: "#FFF5F0",       // very light warm pink
          clay: "#090C0E",       // hotelgoo footer dark
          red: "#F04C33",        // explicit alias
          dark: "#090C0E",       // explicit alias
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(240, 76, 51, 0.12)",
        "premium-hover": "0 20px 40px -15px rgba(240, 76, 51, 0.22)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
