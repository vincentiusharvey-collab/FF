import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export async function getClinics(req: AuthRequest, res: Response) {
  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        veterinarians: true,
        _count: { select: { reviews: true } },
      },
    });
    res.json({ success: true, data: clinics });
  } catch (error) {
    throw error;
  }
}

export async function getClinicById(req: AuthRequest, res: Response) {
  const { clinicId } = req.params;
  try {
    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
      include: {
        veterinarians: true,
        reviews: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });
    res.json({ success: true, data: clinic });
  } catch (error) {
    throw error;
  }
}

export async function getClinicVeterinarians(req: AuthRequest, res: Response) {
  const { clinicId } = req.params;
  try {
    const veterinarians = await prisma.veterinarian.findMany({
      where: { clinicId },
    });
    res.json({ success: true, data: veterinarians });
  } catch (error) {
    throw error;
  }
}

export async function getVeterinarianById(req: AuthRequest, res: Response) {
  const { vetId } = req.params;
  try {
    const veterinarian = await prisma.veterinarian.findUnique({
      where: { id: vetId },
      include: { clinic: true, reviews: { orderBy: { createdAt: 'desc' }, take: 10 } },
    });
    res.json({ success: true, data: veterinarian });
  } catch (error) {
    throw error;
  }
}

export async function searchClinics(req: AuthRequest, res: Response) {
  const { query, latitude, longitude } = req.query;
  try {
    // TODO: Implement geospatial search
    const clinics = await prisma.clinic.findMany({
      where: query ? {
        OR: [
          { name: { contains: query as string, mode: 'insensitive' } },
          { services: { has: query as string } },
        ],
      } : {},
      include: { veterinarians: true },
    });
    res.json({ success: true, data: clinics });
  } catch (error) {
    throw error;
  }
}
