"use client"

import { useEffect, useState } from "react"
import { MoveLeft, MoveRight, MapPin, Star, Search, Menu } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/stores/authstore"
import { useRouter } from "next/navigation"

type Listing = {
  id: number
  title: string
  location: string
  price: number
  images: { url: string }[]
}

type Review = {
  id: number
  rating: number
  comment: string | null
  user: { name: string; image: string | null }
  listing: { location: string }
}

export default function LandingPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewIndex, setReviewIndex] = useState(0)
  const { isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then((d: Listing[]) => setListings(Array.isArray(d) ? d : []))
      .catch(console.error)

    fetch("/api/reviews/top")
      .then((r) => r.json())
      .then((d: Review[]) => setReviews(Array.isArray(d) ? d : []))
      .catch(console.error)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    window.location.href = `/search${params.toString() ? `?${params}` : ""}`
  }

  const currentReview = reviews[reviewIndex]

  return (
    <div className="min-h-screen bg-[#FFFDFC] dark:bg-[#090C0E] font-sans text-[#111] dark:text-[#F5F5F5] overflow-x-hidden selection:bg-[#F04C33] selection:text-white">

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/hero-illustration.jpg"
          alt="Beautiful stay"
          className="w-full h-auto block -mt-[10%]"
        />

        {/* ── NAVBAR ── */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between">

          {/* LEFT — hamburger with black bg flush to corner + transparent nav links */}
          <div className="flex items-center">
            <button className="bg-[#111] px-4 py-4 flex items-center justify-center flex-shrink-0">
              <Menu className="w-4 h-4 text-white" />
            </button>
            <Link href="/search" className="text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:text-[#F04C33] transition-colors hidden md:block px-4 py-4">
              Explore
            </Link>
            <Link href="/search" className="text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:text-[#F04C33] transition-colors hidden md:block px-4 py-4">
              Stays
            </Link>
          </div>

          {/* CENTER — wordmark in white */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-widest text-white">
            STAY<span className="font-bold italic">FINDER</span>
          </Link>

          {/* RIGHT — white text + red pill flush to right edge */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { logout(); router.push("/login") }}
                  className="text-[11px] font-bold tracking-[0.15em] uppercase text-white hidden md:flex items-center px-4 py-4 hover:bg-white/10 transition-colors"
                >
                  Sign Out
                </button>
                <Link href="/dashboard" className="bg-[#F04C33] hover:bg-[#d94129] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-full px-5 py-2 mr-4 transition-colors">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[11px] font-bold tracking-[0.15em] uppercase text-white hidden md:flex items-center px-4 py-1 hover:text-[#F04C33] transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-[#F04C33] hover:bg-[#d94129] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-full px-5 py-2 mr-4 transition-colors">
                  Reserve Now
                </Link>
              </>
            )}
          </div>

        </nav>

        {/* ── HEADLINE + BOOKING BAR stacked ── */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center px-4 w-full">
          <h1 className="font-serif text-white text-6xl md:text-8xl lg:text-[8rem] leading-[1.05] tracking-wide drop-shadow-lg">
            BOOK<br />
            <span className="italic font-light">EASY, STAY</span><br />
            HAPPY
          </h1>

          {/* Booking bar — directly below headline */}
          <div className="mt-8 z-20 bg-white dark:bg-[#111] rounded-full p-2 pl-5 md:pl-8 shadow-2xl flex items-center gap-3 md:gap-6 max-w-[94%] md:max-w-3xl w-full">
            <div className="flex flex-col flex-1 min-w-0 border-r border-gray-100 dark:border-white/10 pr-3 md:pr-5">
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1 text-left">Where</span>
              <input
                type="text"
                placeholder="Destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm md:text-base font-semibold bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 text-left"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0 border-r border-gray-100 dark:border-white/10 pr-3 md:pr-5">
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1 text-left">Check In</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="text-sm font-semibold bg-transparent outline-none text-gray-800 dark:text-white w-full min-w-0 text-left"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0 pr-3 md:pr-5">
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1 text-left">Check Out</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="text-sm font-semibold bg-transparent outline-none text-gray-800 dark:text-white w-full min-w-0 text-left"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#F04C33] p-4 md:p-5 rounded-full text-white hover:bg-[#d94129] hover:scale-105 transition-all shadow-lg shadow-red-500/30 shrink-0"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="relative z-20 bg-[#FFFDFC] dark:bg-[#090C0E] pt-[200px] pb-20 px-6 md:px-12 flex flex-col items-center text-center rounded-t-[2.5rem] -mt-10">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl max-w-4xl leading-[1.1] mb-[148px] text-[#111] dark:text-white">
          FIND THE{" "}
          <span className="text-[#F04C33] italic">PERFECT STAY</span>
          <br />
          <span className="text-[#F04C33]">WITH</span> THE BEST DEALS,
          <br />
          GUARANTEED.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-[180px]">
          <Link
            href="/search"
            className="bg-[#111] dark:bg-white text-white dark:text-[#111] px-10 py-4 rounded-full text-[11px] tracking-[0.15em] font-bold hover:opacity-80 transition"
          >
            EXPLORE STAYS
          </Link>
          <Link
            href="/host/add-property"
            className="bg-transparent text-[#111] dark:text-white border-2 border-[#111] dark:border-white px-10 py-4 rounded-full text-[11px] tracking-[0.15em] font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition"
          >
            LIST YOUR PLACE
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full px-5" style={{ gap: "28px" }}>
          {[
            { title: "Best Price\nGuarantee", desc: "Get the lowest rates on top hotels.", img: "/1.png" },
            { title: "Easy & Secure\nBooking", desc: "Hassle-free reservations with secure payment options.", img: "/2.png" },
            { title: "Exclusive Deals\n& Discounts", desc: "Save more with our special offers and packages.", img: "/3.png" },
            { title: "24/7 Customer\nSupport", desc: "We're here to assist you anytime, anywhere.", img: "/4.png" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F7F6F2] dark:bg-white/5 rounded-[2rem] flex flex-col hover:-translate-y-2 transition-transform duration-300"
              style={{ height: "560px" }}
            >
              {/* Image — 62% of card height */}
              <div className="flex items-center justify-center px-4 pt-6" style={{ height: "62%" }}>
                <img src={item.img} alt={item.title} className="h-full w-full object-contain" />
              </div>

              {/* Text — 38% of card height */}
              <div className="px-8 pb-8 pt-4 flex flex-col gap-2" style={{ height: "38%" }}>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold leading-snug whitespace-pre-line text-[#111] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="h-[192px] bg-[#FFFDFC] dark:bg-[#090C0E]" />

      {/* ── EXPLORE SECTION ── */}
      <section className="relative z-10 px-6 md:px-14 bg-[#FFFDFC] dark:bg-[#090C0E] rounded-b-[3rem]" style={{ paddingBottom: "380px" }}>
        <div className="relative" style={{ minHeight: "860px", paddingTop: "80px" }}>

          {/* Lines 1+2: z-30 so EXPLORE overlaps top of left card */}
          <div
            className="relative z-30 font-serif leading-[1.05] tracking-tight select-none pointer-events-none"
            style={{ fontSize: "clamp(64px, 16vw, 230px)" }}
          >
            <div className="uppercase text-[#111] dark:text-white">EXPLORE</div>
            <div className="uppercase text-[#F04C33]" style={{ marginLeft: "18vw" }}>OUR ROOMS</div>
          </div>

          {/* Line 3: z-10 so bottom-right card overlaps it */}
          <div
            className="relative z-10 font-serif leading-[1.05] tracking-tight select-none pointer-events-none uppercase text-[#111] dark:text-white"
            style={{ fontSize: "clamp(64px, 16vw, 230px)", marginLeft: "10vw" }}
          >
            &amp; SUITES
          </div>

          {/* ── CARD 1: TOP-RIGHT — bleeds above section, only EXPLORE line level visible ── */}
          <div
            className="absolute z-20 rotate-[6deg] rounded-[1.6rem] overflow-hidden shadow-2xl"
            style={{ top: "-12%", right: "1%", width: "clamp(240px, 32vw, 440px)", height: "clamp(240px, 30vw, 420px)" }}
          >
            <img src="/explore-top.jpg" alt="Family travel" className="w-full h-full object-cover object-top" />
          </div>

          {/* ── CARD 2: LEFT — starts at OUR ROOMS (line 2), tall, overlaps into & SUITES. Text z-30 overlaps its top ── */}
          <div
            className="absolute z-20 -rotate-[4deg] rounded-[1.6rem] overflow-hidden shadow-2xl"
            style={{ top: "28%", left: "0%", width: "clamp(160px, 20vw, 270px)", height: "clamp(280px, 46vw, 490px)" }}
          >
            <img src="/explore-left.jpg" alt="Weekend getaway" className="w-full h-full object-cover object-center" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10">
              <p className="text-white text-[11px] font-bold leading-tight">Weekend<br />Getaway</p>
            </div>
          </div>

          {/* ── CARD 3: BOTTOM-RIGHT — below OUR ROOMS, overlaps & SUITES line ── */}
          <div
            className="absolute z-20 rotate-[4deg] rounded-[1.6rem] overflow-hidden shadow-2xl"
            style={{ top: "62%", right: "1%", width: "clamp(240px, 33vw, 460px)", height: "clamp(250px, 33vw, 460px)" }}
          >
            <img src="/room-bedroom.jpg" alt="Luxury suite" className="w-full h-full object-cover" />
          </div>

          {/* Description — anchored at & SUITES start (~10vw from left) */}
          <p
            className="absolute text-gray-500 dark:text-gray-400 text-base leading-relaxed font-semibold"
            style={{ bottom: "-50px", left: "10vw", maxWidth: "clamp(280px, 24vw, 380px)" }}
          >
            Discover a world of comfort and style with our thoughtfully designed rooms and suites.
          </p>

          {/* Button — 10px from third image */}
          <Link
            href="/search"
            className="absolute bg-[#111] dark:bg-white text-white dark:text-[#111] px-9 py-4 rounded-full text-xs tracking-[0.15em] font-bold hover:opacity-80 transition whitespace-nowrap"
            style={{ bottom: "-50px", right: "calc(1% + 33vw + 10px)" }}
          >
            VIEW ALL ROOMS
          </Link>

        </div>

        {/* Listing cards row */}
        {listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {listings.slice(0, 3).map((listing) => (
              <Link key={listing.id} href={`/property/${listing.id}`} className="group">
                <div className="rounded-3xl overflow-hidden bg-[#F7F6F2] dark:bg-white/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={listing.images?.[0]?.url || "/room-bedroom.jpg"}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-[#111] dark:text-white mb-1">{listing.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {listing.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#111] dark:text-white">${listing.price}<span className="text-sm font-normal text-gray-400"> / night</span></span>
                      <span className="text-[11px] font-bold tracking-widest text-[#F04C33] uppercase">View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── DEALS BANNER ── */}
      <section className="relative w-full -mt-12">
        <img src="/deals-bg.jpg" alt="Exclusive deals" className="w-full h-auto block" />

        {/* Title — top left */}
        <div className="absolute top-[8%] left-[5%] z-10">
          <h2 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.15]">
            <span className="relative z-20 bg-[#F04C33] text-white px-3 inline">&ldquo;EXCLUSIVE DEALS</span><br />
            <span className="relative z-10 bg-[#F04C33] text-white px-3 inline">&amp; PACKAGES&rdquo;</span>
          </h2>
        </div>

        {/* Layer 1 — back, most translucent */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-10 w-[62%]">
          <div className="bg-white/30 rounded-full backdrop-blur-sm" style={{ height: "88px" }} />
        </div>

        {/* Layer 2 — middle */}
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10 w-[62%]">
          <div className="bg-white/60 rounded-full backdrop-blur-sm" style={{ height: "88px" }} />
        </div>

        {/* Layer 3 — front actual card */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-20 w-[62%]">
          <div className="relative bg-white rounded-full shadow-2xl flex items-center py-7 px-10">

            {/* Food image — moved 40px closer to center */}
            <div className="absolute -top-20 w-[180px] h-[210px] -rotate-[15deg]" style={{ left: "calc(8% + 40px)" }}>
              <img src="/breakfast-card.jpg" alt="Free breakfast" className="w-full h-full object-contain drop-shadow-xl rounded-2xl" />
            </div>

            {/* Spacer pushes text to right half */}
            <div style={{ width: "48%" }} />

            {/* Text — left aligned */}
            <div className="flex flex-col gap-1 flex-1 items-start text-left">
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-gray-400 uppercase">Weekend Getaway</p>
              <p className="text-3xl md:text-4xl font-bold text-[#111] leading-tight">20% OFF + FREE<br />BREAKFAST</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative bg-[#FFFDFC] dark:bg-[#090C0E] overflow-hidden px-6 md:px-12" style={{ height: "110vh" }}>

        {/* Watermark — two lines, very light */}
        <div className="absolute inset-0 flex flex-col justify-start pointer-events-none select-none z-0" style={{ paddingTop: "108px" }}>
          <h2 className="font-serif text-[13vw] leading-[0.88] text-center text-[#F04C33]/10 dark:text-white/5">
            WHAT OUR
          </h2>
          <h2 className="font-serif text-[13vw] leading-[0.88] text-center text-[#F04C33]/10 dark:text-white/5">
            GUESTS SAY
          </h2>
        </div>

        {/* Palm tree — tall, centered */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10" style={{ height: "90vh" }}>
          <img src="/palm-tree.png" alt="Palm tree" className="h-full object-contain drop-shadow-2xl" />
        </div>

        {/* Left — review text, bottom-left */}
        <div className="absolute bottom-[12%] left-[4%] z-20 max-w-[280px]">
          {currentReview ? (
            <>
              <p className="font-serif text-lg md:text-xl italic text-[#111] dark:text-white leading-[1.6] mb-4">
                &ldquo;{currentReview.comment}&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{currentReview.user.name}</p>
            </>
          ) : (
            <>
              <p className="font-serif text-lg md:text-xl italic text-[#111] dark:text-white leading-[1.6] mb-4">
                &ldquo;The best hotel experience ever! The staff was amazing, and the room was spotless. Perfect location and incredible amenities. Will definitely return!&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sarah T</p>
            </>
          )}
        </div>

        {/* Arrows — flanking the palm trunk at bottom */}
        <button
          onClick={() => setReviewIndex((i) => (i - 1 + Math.max(reviews.length, 1)) % Math.max(reviews.length, 1))}
          className="absolute z-20 group"
          style={{ bottom: "8%", left: "32%" }}
        >
          <MoveLeft className="w-10 h-10 text-gray-400 group-hover:text-[#F04C33] transition" strokeWidth={1} />
        </button>
        <button
          onClick={() => setReviewIndex((i) => (i + 1) % Math.max(reviews.length, 1))}
          className="absolute z-20 group"
          style={{ bottom: "8%", right: "32%" }}
        >
          <MoveRight className="w-10 h-10 text-gray-600 dark:text-white group-hover:text-[#F04C33] transition" strokeWidth={1} />
        </button>

        {/* Right — room image, partially off right edge */}
        <div className="absolute z-20 rounded-3xl overflow-hidden shadow-2xl" style={{ bottom: "6%", right: "4%", width: "clamp(260px, 28vw, 420px)", height: "clamp(300px, 34vw, 500px)" }}>
          <img src="/room-bedroom.jpg" alt="Cozy room" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
        </div>

      </section>

      {/* ── FOOTER ── */}
      <footer className="relative bg-[#090C0E] text-white rounded-t-[2.5rem] overflow-hidden" style={{ height: "130vh" }}>

        {/* Top 40vh — STAYFINDER wordmark */}
        <div className="relative z-10 flex items-center justify-center" style={{ height: "40vh", marginTop: "-2vh" }}>
          <h2 className="text-[11vw] font-serif leading-none tracking-tighter text-white">
            STAY<span className="font-bold italic">FINDER</span>
          </h2>
        </div>

        {/* Footer links */}
        <div className="relative z-10 px-6 md:px-12 pb-14">
          <div className="max-w-[85rem] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 border-t border-white/10 pt-10">
              <div className="flex flex-col gap-5">
                <Link href="/search" className="hover:text-white transition">EXPLORE</Link>
                <Link href="/host" className="hover:text-white transition">HOST</Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link href="/dashboard" className="hover:text-white transition">DASHBOARD</Link>
                <Link href="/profile" className="hover:text-white transition">PROFILE</Link>
              </div>
              <div className="flex flex-col gap-5">
                <Link href="#" className="hover:text-white transition">ABOUT</Link>
                <Link href="#" className="hover:text-white transition">BLOG</Link>
              </div>
              <div className="flex flex-col gap-5 md:text-right">
                <a href="#" className="hover:text-white transition">INSTAGRAM</a>
                <a href="#" className="hover:text-white transition">TWITTER / X</a>
                <a href="#" className="hover:text-white transition">LINKEDIN</a>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600">
              <span>© {new Date().getFullYear()} StayFinder. All rights reserved.</span>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-white transition">Privacy</Link>
                <Link href="#" className="hover:text-white transition">Terms</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Closing image — absolute, anchored to bottom, content overlaps it */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <div className="relative">
            <img src="/footer-night.jpg" alt="" className="w-full h-auto block" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

      </footer>

    </div>
  )
}
