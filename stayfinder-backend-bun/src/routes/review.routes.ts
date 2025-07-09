import { Router } from 'express';
import { createReview, getMyReviews, getReviewsByListing } from '../controllers/reviews.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJwt, createReview);
router.get('/me', authenticateJwt, getMyReviews);
router.get('/:id', getReviewsByListing);

export default router;
