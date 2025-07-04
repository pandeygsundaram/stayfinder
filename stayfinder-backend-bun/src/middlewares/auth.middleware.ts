import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    userId?: number;
}

const secret = process.env.JWT_SECRET!;
export const authenticateJwt = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //     res.status(401).json({ msg: 'No token provided' });
    //     return;
    // }

    // const token = authHeader.split(' ')[1];

    const token = req.cookies?.token;

    if (!token) {
        throw new Error('Token is undefined');
    }
    try {
        const decoded = jwt.verify(token, secret) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
