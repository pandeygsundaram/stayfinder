import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import listingRoutes from './routes/listings.routes';
import bookingRoutes from './routes/bookings.routes'
import wishlistRoutes from './routes/wishlist.routes';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/wishlist' ,wishlistRoutes );


app.listen(process.env.PORT, () => {
  console.log(`StayFinder backend running on http://localhost:${process.env.PORT} 🚀`);
});