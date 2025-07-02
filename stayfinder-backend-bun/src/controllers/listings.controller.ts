import type { Response } from 'express';
import type { TypedRequest } from '../utils/types'; // path may vary
import { prisma } from '../prisma/client';

import type { AuthRequest } from '../middlewares/auth.middleware';
import type { CreateListingResponse, ListingsResponse, SingleListingResponse } from '../utils/listings.types';

export const createListing = async (req: AuthRequest, res: Response<CreateListingResponse>): Promise<void> => {
    try {
        const {
            title,
            description,
            price,
            location,
            latitude,
            longitude,
            images,
        } = req.body;

        const listing = await prisma.listing.create({
            data: {
                title,
                description: description ?? "No description provided.",
                location: location ?? "Unknown location",
                latitude: latitude ?? 0.0,
                longitude: longitude ?? 0.0,
                price,
                userId: req.userId!,
                images: {
                    create: (images ?? []).map((url: string) => ({ url })),
                },
            },
            include: {
                images: true,
            },
        });

        res.status(201).json(listing);
    } catch (err) {
        console.error("Error creating listing:", err);
        res.status(500).json({ msg: "Something went wrong." });
    }
};

export const getAllListings = async (_req: Request, res: Response<ListingsResponse | { msg: string }>): Promise<void> => {
    try {
        const listings = await prisma.listing.findMany({
            include: { images: true, user: {
                select:{
                    email:true,
                    id:true
                }
            } },
        });
        res.json(listings);
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


interface Params {
    id: string;
}

export const getListingById = async (req: TypedRequest<Params>, res: Response<SingleListingResponse>): Promise<void> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: "Invalid ID" })
        return
    };

    try {
        const listing = await prisma.listing.findUnique({
            where: { id },
            include: {
                images: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                bookings: true,

            },
        });

        if (!listing) {
            res.status(404).json({ msg: "Listing not found" });
            return
        }
        // @ts-ignore
        res.status(200).json(listing);
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
};

interface SearchQuery {
    location?: string;
    startDate?: string;
    endDate?: string;
}

export const searchListings = async (req: TypedRequest<{}, {}, SearchQuery>, res: Response): Promise<any> => {
    const { location, startDate, endDate } = req.query;

    if (!location || !startDate || !endDate) {
        return res.status(400).json({ msg: 'Location and date range required' });
    }

    const parsedStartDate = new Date(startDate as string);
    const parsedEndDate = new Date(endDate as string);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ msg: "Invalid date format. Use ISO format like 2025-07-01." });
    }

    try {
        const listings = await prisma.listing.findMany({
            where: {
                location: {
                    contains: location.toLowerCase(),
                },
                bookings: {
                    none: {
                        OR: [
                            {
                                startDate: { lte: parsedEndDate },
                                endDate: { gte: parsedStartDate },
                            }
                        ]
                    }
                }
            },
            include: {
                images: true,
                user: true,
            }
        });

        res.json(listings);
    } catch (err) {
        console.error('Error searching listings:', err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
};
