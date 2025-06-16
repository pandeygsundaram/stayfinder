
import { Router } from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlist.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJwt, getWishlist);
router.post('/:id', authenticateJwt, addToWishlist);
router.delete('/:id', authenticateJwt, removeFromWishlist);

export default router;