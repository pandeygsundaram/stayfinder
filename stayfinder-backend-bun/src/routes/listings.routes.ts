import { Router } from 'express';
import { createListing, getAllListings, getAllListingsWithWishlist, getListingById, searchListings } from '../controllers/listings.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJwt, createListing);
//@ts-ignore
router.get('/' , getAllListings);
router.get('/private' , authenticateJwt, getAllListingsWithWishlist);
router.get('/search' , searchListings);
router.get('/:id' , getListingById);


export default router;