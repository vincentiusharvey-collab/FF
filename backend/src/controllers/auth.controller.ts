import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateTokens } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
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

    // Generate tokens
    const tokens = generateTokens({ userId: user.id, email: user.email });

    res.status(201).json({
      success: true,
      data: {
        user,
        tokens,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate tokens
    const tokens = generateTokens({ userId: user.id, email: user.email });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          profileImage: user.profileImage,
          isEmailVerified: user.isEmailVerified,
          twoFactorEnabled: user.twoFactorEnabled,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        tokens,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(req: Request, res: Response) {
  // TODO: Implement refresh token logic
  res.json({ success: true, message: 'Refresh token endpoint' });
}

export async function logout(req: Request, res: Response) {
  // TODO: Implement logout logic (blacklist token)
  res.json({ success: true, message: 'Logged out successfully' });
}

export async function forgotPassword(req: Request, res: Response) {
  // TODO: Implement forgot password logic
  res.json({ success: true, message: 'Password reset email sent' });
}

export async function resetPassword(req: Request, res: Response) {
  // TODO: Implement reset password logic
  res.json({ success: true, message: 'Password reset successful' });
}

export async function verifyEmail(req: Request, res: Response) {
  // TODO: Implement email verification logic
  res.json({ success: true, message: 'Email verified successfully' });
}
