import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        isEmailVerified: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const { firstName, lastName, phone, profileImage } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(profileImage && { profileImage }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        isEmailVerified: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    throw error;
  }
}

export async function changePassword(req: AuthRequest, res: Response) {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user!.userId },
      data: { password: hashedPassword },
    });

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    throw error;
  }
}

export async function deleteAccount(req: AuthRequest, res: Response) {
  try {
    await prisma.user.delete({ where: { id: req.user!.userId } });
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    throw error;
  }
}
