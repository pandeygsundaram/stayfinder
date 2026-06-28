# StayFinder

A modern hotel and stay booking platform built with Next.js 15.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v3
- **Database**: SQLite via Prisma ORM
- **Auth**: NextAuth.js
- **Runtime**: Bun

## Getting Started

```bash
cd stayfinder-landing

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
bun run db:migrate

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
stayfinder-landing/   # Next.js frontend + API routes
├── app/              # App Router pages and API routes
├── components/       # Reusable UI components
├── lib/              # Prisma client and auth helpers
├── prisma/           # Database schema and migrations
├── public/           # Static assets and images
└── stores/           # Zustand auth store
```

## Environment Variables

See `stayfinder-landing/.env.example` for required variables.
