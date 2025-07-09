import request from 'supertest';
import { prisma } from '../src/prisma/client';
import app from '../src/index';
import bcrypt from 'bcrypt';

let agent = request.agent(app);
let listingId: number;

beforeAll(async () => {
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('testpass', 10);

  const user = await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      password: hashedPassword,
      name: 'Test User'
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title: 'Test Listing',
      price: 100,
      location: 'Mars',
      userId: user.id
    }
  });

  listingId = listing.id;

  await prisma.booking.create({
    data: {
      userId: user.id,
      listingId: listing.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-03'),
      status: 'Approved'
    }
  });

  // Login to get and store cookie
  const res = await agent
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'testpass' });

  if (res.statusCode !== 200) {
    console.error("Login failed:", res.body);
  } else {
    console.log("Login cookie set ✅");
  }
});

describe('Review Routes', () => {
  it('should create a review for a completed booking ✅', async () => {
    const res = await agent.post('/api/reviews').send({
      listingId,
      rating: 5,
      comment: 'Loved it! 🚀'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.rating).toBe(5);
  });

  it('should not allow duplicate reviews 🛑', async () => {
    const res = await agent.post('/api/reviews').send({
      listingId,
      rating: 4,
      comment: 'Trying to double dip 😬'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already reviewed/i);
  });

  it('should get my reviews (protected route) 🔐', async () => {
    const res = await agent.get('/api/reviews/me');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('listing');
  });

  it('should get reviews by listingId (public route) 👀', async () => {
    const res = await request(app).get(`/api/reviews/${listingId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('user');
  });
});

afterAll(async () => {
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
