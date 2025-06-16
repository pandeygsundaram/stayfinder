# StayFinder 🏡

    StayFinder is a full-stack web app that allows users to list, browse, and book properties for short stays. Built with Bun, Express, Prisma, and MySQL.

## 🚀 Features

    - User authentication using JWT
    - Create and manage property listings
    - Upload multiple images per listing
    - Google Maps integration (location, lat/lng)
    - Booking system (in progress)
    - Wishlist functionality (in progress)
    - Filter listings by location, price, and date (coming soon)

## 📁 Project Structure

    /src  
    ├── controllers        // Logic for routes  
    ├── routes             // Route definitions  
    ├── middlewares        // Auth and other middlewares  
    ├── utils              // Helper functions and types  
    ├── prisma             // Prisma schema and generated client  
    └── index.ts           // App entry point  

## 📦 Tech Stack

    - Backend: Express + Bun
    - ORM: Prisma
    - Database: MySQL
    - Auth: JWT & bcrypt
    - Language: TypeScript

## 🔐 Auth Endpoints

    POST   /api/auth/register     - Register a new user  
    POST   /api/auth/login        - Log in and receive a JWT  

## 🏡 Listing Endpoints

    POST   /api/listings          - Create a new listing (auth required)  
    GET    /api/listings          - Fetch all listings  
    GET    /api/listings/:id      - Fetch a listing by ID  

## 📅 Booking Endpoints (coming soon)

    POST   /api/bookings              - Book a listing  
    GET    /api/bookings/user         - View all bookings made by user  

## ❤️ Wishlist Endpoints (coming soon)

    POST   /api/wishlist/:listingId   - Add a listing to wishlist  
    GET    /api/wishlist              - View all wishlist items  
    DELETE /api/wishlist/:listingId  - Remove a listing from wishlist  

## 🔍 Filter Search (coming soon)

    Search listings by:
        - Location
        - Price range
        - Availability dates

## 🛠️ Running the Project

1. Clone this repo  
2. Install dependencies using `bun install`  
3. Set up your `.env` file with the following:

        DATABASE_URL="mysql://user:password@localhost:3306/stayfinder"

        JWT_SECRET="your_secret_key"

4. Generate the Prisma client:

        bunx prisma generate
5. Run the server:

        bun run dev


## 🙌 Contributing

        PRs and feedback are welcome! Let's make StayFinder awesome ✨

## 📃 License

        MIT