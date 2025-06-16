import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;


if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment');
}

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};