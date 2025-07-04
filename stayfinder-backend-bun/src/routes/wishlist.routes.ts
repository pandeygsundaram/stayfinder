
import { Router, type RequestHandler } from 'express';
import { addToWishlist, removeFromWishlist, getWishlist, checkWishlistStatus } from '../controllers/wishlist.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJwt, getWishlist);
router.get('/:id' , authenticateJwt , checkWishlistStatus)
router.post('/:id', authenticateJwt, addToWishlist);
router.delete('/:id', authenticateJwt, removeFromWishlist);

export default router;