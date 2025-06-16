// controllers/bookings.controller.ts
import type { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';


export const createBooking = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { listingId, startDate, endDate } = req.body;

        const existingConflicts = await prisma.booking.findFirst({
            where: {
                listingId,
                OR: [
                    {
                        startDate: { lte: new Date(endDate) },
                        endDate: { gte: new Date(startDate) },
                    },
                ],
            },
        });

        if (existingConflicts) {
            {
                res.status(409).json({ msg: 'This listing is already booked for those dates.' });
                return
            }
        }

        const booking = await prisma.booking.create({
            data: {
                listingId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId: req.userId!,
            },
            include: {
                listing: true,
            },
        });

        res.status(201).json(booking);
        return
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};




export const getUserBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                userId: req.userId!,
            },
            include: {
                listing: {
                    include: {
                        images: true,
                    },
                },
            },
            orderBy: {
                startDate: 'desc',
            },
        });

        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ msg: 'Could not fetch bookings.' });
    }
};