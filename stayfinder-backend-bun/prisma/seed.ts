// prisma/seed.ts
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // 🌟 Step 1: Create a demo user
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        password: 'hashedpassword123', // Hash this in real life pls
      },
    });
    console.log('✅ Created demo user');
  }

  // 🏠 Step 2: Create 10 listings
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Jaipur'];
  const listings = [];

  for (let i = 1; i <= 10; i++) {
    const listing = await prisma.listing.create({
      data: {
        title: `Cozy Stay #${i}`,
        description: `Listing #${i}: A cozy place to stay.`,
        location: locations[i % locations.length]!,
        latitude: 28.6 + i * 0.01,
        longitude: 77.2 + i * 0.01,
        price: 1000 + i * 50,
        user: { connect: { id: user.id } },
        images: {
          create: [
            {
              url: `https://source.unsplash.com/random/800x600?sig=${i}`,
            },
            {
              url: `https://source.unsplash.com/random/800x600?house-${i}`,
            },
          ],
        },
      },
    });

    listings.push(listing);
    console.log(`🏡 Listing ${i} created`);
  }

  console.log(`✅ Seeded ${listings.length} listings with images!`);
}

main()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
