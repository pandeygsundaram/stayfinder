import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import listingRoutes from './routes/listings.routes';
import bookingRoutes from './routes/bookings.routes'
import wishlistRoutes from './routes/wishlist.routes';
import reviewRoutes from './routes/review.routes'
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/wishlist' ,wishlistRoutes );
app.use('/api/reviews', reviewRoutes);

export default app;
