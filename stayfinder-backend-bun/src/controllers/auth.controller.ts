import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import type { Request, Response } from 'express';


export const register = async (req: Request, res: Response) : Promise<any> => {
  const { email, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  console.log("userid being logged here", user.id)
  console.log(typeof user.id)

  const token = generateToken(user.id);
  res.json({ token });
};

export const login = async (req: Request, res: Response) : Promise<any>  => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = generateToken(user.id);
  res.json({ token });
};
