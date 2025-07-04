import { prisma } from "../prisma/client";
import type { Request, Response } from 'express';
import type { TypedAuthRequest } from "../utils/types";
import type { ParamsDictionary, RequestHandler } from "express-serve-static-core";


interface Params extends ParamsDictionary {
    id: string;
}


export const addToWishlist : RequestHandler<Params> = async (req: TypedAuthRequest<Params>, res: Response): Promise<void> => {
    try {
        const listingId = parseInt(req.params.id);

        const alreadyExists = await prisma.wishlist.findUnique({
            where: {
                userId_listingId: {
                    userId: req.userId!,
                    listingId,
                },
            },
        });

        if (alreadyExists) {
            res.status(400).json({ msg: "Already wishlisted." });
            return
        }

        const wishlist = await prisma.wishlist.create({
            data: {
                userId: req.userId!,
                listingId,
            },
        });

        res.status(201).json(wishlist);
    } catch (err) {
        console.error("Error adding to wishlist:", err);
        res.status(500).json({ msg: "Something went wrong." });
        return
    }
};


export const removeFromWishlist : RequestHandler<Params> = async (req: TypedAuthRequest<Params>, res: Response) => {
    try {
        const listingId = parseInt(req.params.id);

        await prisma.wishlist.delete({
            where: {
                userId_listingId: {
                    userId: req.userId!,
                    listingId,
                },
            },
        });

        res.json({ msg: "Removed from wishlist." });
    } catch (err) {
        console.error("Error removing from wishlist:", err);
        res.status(500).json({ msg: "Something went wrong." });
    }
};


export const getWishlist = async (req: TypedAuthRequest, res: Response) => {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: { userId: req.userId! },
            include: {
                listing: {
                    include: { images: true, user: true },
                },
            },
        });

        const listings = wishlist.map(item => item.listing);
        res.json(listings);
    } catch (err) {
        console.error("Error fetching wishlist:", err);
        res.status(500).json({ msg: "Something went wrong." });
    }
};


export const checkWishlistStatus : RequestHandler<Params>= async (
    req: TypedAuthRequest<Params>,
    res: Response
) => {
    const listingId = parseInt(req.params.id);
    const userId = req.userId;

    if (!userId || isNaN(listingId)) {
        res.status(400).json({ msg: "Invalid request" });
        return;
    }

    try {
        const wishlist = await prisma.wishlist.findFirst({
            where: {
                userId,
                listingId,
            },
        });

        res.status(200).json({ isWishlisted: !!wishlist });
    } catch (err) {
        console.error("Error checking wishlist status:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
};