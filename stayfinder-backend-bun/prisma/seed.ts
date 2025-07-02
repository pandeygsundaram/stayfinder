import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const imageUrls = [
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
  'https://images.unsplash.com/photo-1433477303177-8270baa12c9a',
  'https://images.unsplash.com/photo-1510608658071-c48be9a076f6',
  'https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0',
  'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904',
  'https://plus.unsplash.com/premium_photo-1661962769148-fbe587e60fb8',
  'https://plus.unsplash.com/premium_photo-1731287745095-120001ef1763',
  'https://images.unsplash.com/photo-1708272958175-27f4fb4cee59',
  'https://images.unsplash.com/photo-1626161325944-e812764c2314',
  'https://images.unsplash.com/photo-1596838132746-b9ded2acf54f',
  'https://images.unsplash.com/photo-1707273550647-8db82dd210b2',
  'https://images.unsplash.com/photo-1698653223194-dedebae1ee58',
  'https://plus.unsplash.com/premium_photo-1671132512859-f50459af3812',
  'https://plus.unsplash.com/premium_photo-1673468922198-af2d3dde732f',
  'https://images.unsplash.com/photo-1562349118-702416e97ef1',
  'https://plus.unsplash.com/premium_photo-1728681343624-f6558b41e9b4',
];

const titles = [
  'The Minimalist Dream',
  'Cloud 9 Crib',
  'Urban Jungle Bungalow',
  'Retro Chic Nest',
  'Sunset Villa Supreme',
  'Hidden Gem Hut',
  'Boho Breeze Loft',
  'Cozy Cave Retreat',
  'Glass House on the Hill',
  'Infinity Zen Den',
];

const descriptions = [
  'Where vibes meet comfort and chaos stays outside.',
  'Stay here once and consider moving in forever.',
  'Built for dreamers, nappers, and serial binge-watchers.',
  'Now with 50% more plant vibes and 100% less reality.',
  'Furniture not included in your dreams (but is IRL).',
  'A Pinterest board brought to life.',
  'Hot showers, cold drinks, and all the Wi-Fi.',
  'Privacy level: can hear your own thoughts.',
  'The kind of place your IG stories were made for.',
  'Chill harder than your ex ever did.',
];

const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Chennai', 'Kolkata'];

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice() {
  return Math.floor(Math.random() * 2000) + 1500; // ₹1500 - ₹3500
}

function getRandomCoords(base: number, offset: number) {
  return base + (Math.random() - 0.5) * offset;
}

async function main() {
  let user = await prisma.user.findFirst();

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        password: 'hashedpassword123',
        name: 'sassy',
        Age: 20,
      },
    });
    console.log('✅ Created demo user');
  }

  const listings = [];

  for (let i = 0; i < 5; i++) {
    const title = getRandom(titles);
    const description = getRandom(descriptions);
    const location = getRandom(locations);
    const price = getRandomPrice();
    const latitude = getRandomCoords(28.6, 0.2);
    const longitude = getRandomCoords(77.2, 0.2);

    const imagesForListing = imageUrls.slice(i * 3, i * 3 + 3).map((url) => ({ url }));

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        location,
        latitude,
        longitude,
        price,
        user: { connect: { id: user.id } },
        images: {
          create: imagesForListing,
        },
      },
    });

    listings.push(listing);
    console.log(`✨ Listing "${title}" created in ${location}`);
  }

  console.log(`✅ Seeded ${listings.length} quirky listings with serious aesthetic.`);
}

main()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
