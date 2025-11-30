import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export async function getUserPets(req: AuthRequest, res: Response) {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { primaryOwnerId: req.user!.userId },
          { caregivers: { some: { userId: req.user!.userId, isActive: true } } },
        ],
        isActive: true,
      },
      include: {
        primaryOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        caregivers: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    res.json({ success: true, data: pets });
  } catch (error) {
    throw error;
  }
}

export async function createPet(req: AuthRequest, res: Response) {
  const { name, type, breed, gender, dateOfBirth, weight, weightUnit, color, microchipId, profileImage } = req.body;

  try {
    const pet = await prisma.pet.create({
      data: {
        name,
        type,
        breed,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        weight,
        weightUnit: weightUnit || 'lbs',
        color,
        microchipId,
        profileImage,
        primaryOwnerId: req.user!.userId,
      },
      include: {
        primaryOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    throw error;
  }
}

export async function getPetById(req: AuthRequest, res: Response) {
  const { petId } = req.params;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      include: {
        primaryOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        caregivers: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Check access
    const hasAccess = pet.primaryOwnerId === req.user!.userId ||
      pet.caregivers.some(c => c.userId === req.user!.userId);

    if (!hasAccess) {
      throw new AppError('Access denied', 403);
    }

    res.json({ success: true, data: pet });
  } catch (error) {
    throw error;
  }
}

export async function updatePet(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  const updateData = req.body;

  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    // Check permission
    const caregiver = await prisma.petCaregiver.findFirst({
      where: { petId, userId: req.user!.userId, isActive: true },
    });

    if (pet.primaryOwnerId !== req.user!.userId && (!caregiver || caregiver.role === 'VIEWER')) {
      throw new AppError('Access denied', 403);
    }

    const updatedPet = await prisma.pet.update({
      where: { id: petId },
      data: {
        ...updateData,
        dateOfBirth: updateData.dateOfBirth ? new Date(updateData.dateOfBirth) : undefined,
      },
    });

    res.json({ success: true, data: updatedPet });
  } catch (error) {
    throw error;
  }
}

export async function deletePet(req: AuthRequest, res: Response) {
  const { petId } = req.params;

  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    if (pet.primaryOwnerId !== req.user!.userId) {
      throw new AppError('Only the primary owner can delete a pet', 403);
    }

    await prisma.pet.update({
      where: { id: petId },
      data: { isActive: false },
    });

    res.json({ success: true, message: 'Pet deleted successfully' });
  } catch (error) {
    throw error;
  }
}

export async function getPetCaregivers(req: AuthRequest, res: Response) {
  const { petId } = req.params;

  try {
    const caregivers = await prisma.petCaregiver.findMany({
      where: { petId, isActive: true },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
          },
        },
      },
    });

    res.json({ success: true, data: caregivers });
  } catch (error) {
    throw error;
  }
}

export async function addCaregiver(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  const { email, role } = req.body;

  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet || pet.primaryOwnerId !== req.user!.userId) {
      throw new AppError('Access denied', 403);
    }

    const caregiverUser = await prisma.user.findUnique({ where: { email } });
    if (!caregiverUser) {
      throw new AppError('User not found', 404);
    }

    const caregiver = await prisma.petCaregiver.create({
      data: {
        petId,
        userId: caregiverUser.id,
        role,
        assignedBy: req.user!.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
          },
        },
      },
    });

    res.status(201).json({ success: true, data: caregiver });
  } catch (error) {
    throw error;
  }
}

export async function updateCaregiverRole(req: AuthRequest, res: Response) {
  const { petId, caregiverId } = req.params;
  const { role } = req.body;

  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet || pet.primaryOwnerId !== req.user!.userId) {
      throw new AppError('Access denied', 403);
    }

    const caregiver = await prisma.petCaregiver.update({
      where: { id: caregiverId },
      data: { role },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
          },
        },
      },
    });

    res.json({ success: true, data: caregiver });
  } catch (error) {
    throw error;
  }
}

export async function removeCaregiver(req: AuthRequest, res: Response) {
  const { petId, caregiverId } = req.params;

  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet || pet.primaryOwnerId !== req.user!.userId) {
      throw new AppError('Access denied', 403);
    }

    await prisma.petCaregiver.update({
      where: { id: caregiverId },
      data: { isActive: false },
    });

    res.json({ success: true, message: 'Caregiver removed successfully' });
  } catch (error) {
    throw error;
  }
}
