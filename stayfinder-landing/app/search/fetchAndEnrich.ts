type ListingFromBackend = {
    id: number
    title: string
    description?: string
    location: string
    latitude?: number
    longitude?: number
    price: number
    userId: number
    images: { url: string }[]
    isWishlisted? : boolean
}

// @ts-ignore
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

type PropertyList = Property[]

export type Property = {
    id: number
    title: string
    location: string
    price: number
    rating: number
    reviews: number
    image: string
    tags: string[]
    guests: number
    bedrooms: number
    bathrooms: number
    type: string
    isWishlisted? : boolean
}



// 👑 Your fancy extras pool
const defaultTags = [
    ["Forest View", "Hot Spring"],
    ["Ocean View", "Private Beach"],
    ["Unique Stay", "Nature"],
    ["Tree House", "Magical"],
    ["Mountain View", "Secluded"],
    ["Traditional", "Hot Springs"],
]

const defaultTypes = ["Cottage", "Villa", "Castle", "Tree House", "Ryokan"]


export const fetchAndEnrichListings = async (isAuthenticated: boolean, token?: string) => {
    try {

        const route = isAuthenticated ? "/api/listings/private" : "/api/listings";
        console.log(isAuthenticated)

        const res = await fetch(route, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const data = await res.json()
        console.log(data)

        const enriched = data.map((item: ListingFromBackend) => ({
            id: item.id,
            title: item.title,
            location: item.location,
            price: item.price,
            rating: parseFloat((Math.random() * (5 - 4.6) + 4.6).toFixed(1)), // random 4.6–5.0
            reviews: Math.floor(Math.random() * 150) + 20,
            image: item.images?.[0]?.url || "/placeholder.svg?height=300&width=400",
            tags: getRandom(defaultTags),
            guests: Math.floor(Math.random() * 4) + 2,
            bedrooms: Math.floor(Math.random() * 3) + 1,
            bathrooms: Math.floor(Math.random() * 2) + 1,
            type: getRandom(defaultTypes),
            isWishlisted: item.isWishlisted
        }))

        console.log(isAuthenticated)
        console.log(enriched)
        return enriched



    } catch (err) {
        console.error("Error fetching listings:", err)
        return []
    }
}