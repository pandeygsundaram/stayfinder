import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';


export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed, name } });
  console.log("userid being logged here", user.id)
  console.log(typeof user.id)

  const token = generateToken(user.id);
  console.log(user)
  res.json({
    token, user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log(email, password)
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // or 'strict'/'none' depending on your CORS setup
    maxAge: 1000 * 60 * 60 * 24 * 1, // 7 days
  });

  res.json({ msg: "Login successful" }); 
};

export const whoami = async (req: AuthRequest, res: Response): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,

    },
  });

  if (!user) return res.status(404).json({ msg: 'User not found' });

  res.json(user);
};


export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out" });
};