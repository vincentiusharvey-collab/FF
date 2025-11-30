import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Travel Plans
export async function getTravelPlans(req: AuthRequest, res: Response) {
  try {
    const plans = await prisma.travelPlan.findMany({
      where: { userId: req.user!.userId },
      include: { pet: true, documents: true },
      orderBy: { departureDate: 'desc' },
    });
    res.json({ success: true, data: plans });
  } catch (error) {
    throw error;
  }
}

export async function createTravelPlan(req: AuthRequest, res: Response) {
  try {
    const plan = await prisma.travelPlan.create({
      data: { ...req.body, userId: req.user!.userId },
      include: { pet: true },
    });
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    throw error;
  }
}

export async function getTravelPlanById(req: AuthRequest, res: Response) {
  const { planId } = req.params;
  try {
    const plan = await prisma.travelPlan.findUnique({
      where: { id: planId },
      include: { pet: true, documents: true, checklist: true },
    });
    res.json({ success: true, data: plan });
  } catch (error) {
    throw error;
  }
}

export async function updateTravelPlan(req: AuthRequest, res: Response) {
  const { planId } = req.params;
  try {
    const plan = await prisma.travelPlan.update({
      where: { id: planId },
      data: req.body,
    });
    res.json({ success: true, data: plan });
  } catch (error) {
    throw error;
  }
}

export async function deleteTravelPlan(req: AuthRequest, res: Response) {
  const { planId } = req.params;
  try {
    await prisma.travelPlan.delete({ where: { id: planId } });
    res.json({ success: true, message: 'Travel plan deleted successfully' });
  } catch (error) {
    throw error;
  }
}

// Travel Documents
export async function getTravelDocuments(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const documents = await prisma.travelDocument.findMany({
      where: { petId },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: documents });
  } catch (error) {
    throw error;
  }
}

export async function createTravelDocument(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const document = await prisma.travelDocument.create({
      data: { ...req.body, petId },
    });
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    throw error;
  }
}

export async function updateTravelDocument(req: AuthRequest, res: Response) {
  const { documentId } = req.params;
  try {
    const document = await prisma.travelDocument.update({
      where: { id: documentId },
      data: req.body,
    });
    res.json({ success: true, data: document });
  } catch (error) {
    throw error;
  }
}

export async function deleteTravelDocument(req: AuthRequest, res: Response) {
  const { documentId } = req.params;
  try {
    await prisma.travelDocument.delete({ where: { id: documentId } });
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    throw error;
  }
}

// Compliance Checklist
export async function getComplianceChecklist(req: AuthRequest, res: Response) {
  const { planId } = req.params;
  try {
    const checklist = await prisma.complianceChecklist.findUnique({
      where: { travelPlanId: planId },
    });
    res.json({ success: true, data: checklist });
  } catch (error) {
    throw error;
  }
}

export async function updateComplianceChecklist(req: AuthRequest, res: Response) {
  const { planId } = req.params;
  try {
    const checklist = await prisma.complianceChecklist.upsert({
      where: { travelPlanId: planId },
      update: req.body,
      create: { travelPlanId: planId, ...req.body },
    });
    res.json({ success: true, data: checklist });
  } catch (error) {
    throw error;
  }
}

// Pet ID Cards
export async function getPetIdCard(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const card = await prisma.petIdCard.findFirst({
      where: { petId },
      orderBy: { generatedAt: 'desc' },
    });
    res.json({ success: true, data: card });
  } catch (error) {
    throw error;
  }
}

export async function generatePetIdCard(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });

    // Generate QR code with pet information
    const qrData = JSON.stringify({
      petId: pet!.id,
      name: pet!.name,
      microchipId: pet!.microchipId,
      owner: req.user!.userId,
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    const card = await prisma.petIdCard.create({
      data: {
        petId,
        qrCodeUrl,
        cardUrl: qrCodeUrl, // In production, generate a proper ID card
      },
    });

    res.status(201).json({ success: true, data: card });
  } catch (error) {
    throw error;
  }
}
