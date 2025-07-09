import type { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { TypedRequest } from '../utils/types';
import { promises } from 'dns';

export const createReview = async (req: AuthRequest, res: Response) :Promise<void>=> {
    const userId = req.userId;
    const { listingId, rating, comment } = req.body;
    if (!userId) {
        throw Error("No userId found")
    }

    try {
        const existing = await prisma.review.findUnique({
            where: {
                userId_listingId: {
                    userId,
                    listingId
                }
            }
        });

        if (existing) {
            res.status(400).json({ message: 'You already reviewed this listing 💬' });
            return 
        }

        const now = new Date();

        const completedBooking = await prisma.booking.findFirst({
            where: {
                userId,
                listingId,
                status: 'Approved',
                endDate: {
                    lt: now // booking must be completed
                }
            }
        });

        if (!completedBooking) {
            res.status(403).json({
                message: 'You can only review listings you have completed a stay at 😤'
            });
            return 
        }

        const review = await prisma.review.create({
            data: {
                userId,
                listingId,
                rating,
                comment
            }
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('createReview error:', error);
        res.status(500).json({ message: 'Failed to leave review 😓' });
    }
};

interface Params {
    id: string;
}

export const getReviewsByListing = async (req: TypedRequest<Params>, res: Response):Promise<void> => {
    const listingId = parseInt(req.params.id);
    if (isNaN(listingId)) {
        res.status(400).json({ message: 'Invalid listing ID 🤡' });
        return 
    }
    console.log(listingId)

    try {
        const reviews = await prisma.review.findMany({
            where: { listingId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(reviews);
    } catch (error) {
        console.error('getReviewsByListing error:', error);
        res.status(500).json({ message: 'Could not fetch reviews 🧱' });
    }
};

export const getMyReviews = async (req: AuthRequest, res: Response):Promise<void> => {
    const userId = req.userId;

    try {
        const reviews = await prisma.review.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        location: true
                    }
                }
            }
        });

        res.json(reviews);
    } catch (error) {
        console.error('getMyReviews error:', error);
        res.status(500).json({ message: 'Could not get your reviews 😬' });
    }
};
