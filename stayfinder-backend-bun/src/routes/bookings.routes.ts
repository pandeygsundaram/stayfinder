// routes/bookings.routes.ts
import { Router } from 'express';
import { createBooking, getUserBookings } from '../controllers/bookings.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJwt, createBooking);
router.get('/', authenticateJwt, getUserBookings);

export default router;
