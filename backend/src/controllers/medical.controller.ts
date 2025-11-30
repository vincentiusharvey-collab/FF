import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

// Medical Records
export async function getMedicalRecords(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const records = await prisma.medicalRecord.findMany({
      where: { petId },
      include: { attachments: true },
      orderBy: { date: 'desc' },
    });
    res.json({ success: true, data: records });
  } catch (error) {
    throw error;
  }
}

export async function createMedicalRecord(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  const { type, title, description, date, veterinarianName, clinicName, metadata } = req.body;

  try {
    const record = await prisma.medicalRecord.create({
      data: {
        petId,
        type,
        title,
        description,
        date: new Date(date),
        veterinarianName,
        clinicName,
        metadata,
        createdBy: req.user!.userId,
      },
      include: { attachments: true },
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    throw error;
  }
}

export async function getMedicalRecordById(req: AuthRequest, res: Response) {
  const { recordId } = req.params;
  try {
    const record = await prisma.medicalRecord.findUnique({
      where: { id: recordId },
      include: { attachments: true },
    });
    if (!record) throw new AppError('Record not found', 404);
    res.json({ success: true, data: record });
  } catch (error) {
    throw error;
  }
}

export async function updateMedicalRecord(req: AuthRequest, res: Response) {
  const { recordId } = req.params;
  try {
    const record = await prisma.medicalRecord.update({
      where: { id: recordId },
      data: req.body,
      include: { attachments: true },
    });
    res.json({ success: true, data: record });
  } catch (error) {
    throw error;
  }
}

export async function deleteMedicalRecord(req: AuthRequest, res: Response) {
  const { recordId } = req.params;
  try {
    await prisma.medicalRecord.delete({ where: { id: recordId } });
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    throw error;
  }
}

// Record Sharing
export async function shareRecord(req: AuthRequest, res: Response) {
  const { recordId } = req.params;
  const { recipient, shareMethod, permissions, expiresAt } = req.body;

  try {
    const record = await prisma.medicalRecord.findUnique({ where: { id: recordId } });
    if (!record) throw new AppError('Record not found', 404);

    const share = await prisma.medicalRecordShare.create({
      data: {
        recordId,
        petId: record.petId,
        sharedBy: req.user!.userId,
        recipient,
        shareMethod,
        permissions: permissions || 'READ_ONLY',
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
    });
    res.status(201).json({ success: true, data: share });
  } catch (error) {
    throw error;
  }
}

export async function getRecordShares(req: AuthRequest, res: Response) {
  const { recordId } = req.params;
  try {
    const shares = await prisma.medicalRecordShare.findMany({
      where: { recordId, isActive: true },
    });
    res.json({ success: true, data: shares });
  } catch (error) {
    throw error;
  }
}

export async function revokeShare(req: AuthRequest, res: Response) {
  const { shareId } = req.params;
  try {
    await prisma.medicalRecordShare.update({
      where: { id: shareId },
      data: { isActive: false },
    });
    res.json({ success: true, message: 'Share revoked successfully' });
  } catch (error) {
    throw error;
  }
}

// Vaccinations
export async function getVaccinations(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const vaccinations = await prisma.vaccination.findMany({
      where: { petId },
      orderBy: { administeredDate: 'desc' },
    });
    res.json({ success: true, data: vaccinations });
  } catch (error) {
    throw error;
  }
}

export async function createVaccination(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const vaccination = await prisma.vaccination.create({
      data: { ...req.body, petId, administeredDate: new Date(req.body.administeredDate) },
    });
    res.status(201).json({ success: true, data: vaccination });
  } catch (error) {
    throw error;
  }
}

// Prescriptions
export async function getPrescriptions(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { petId, isActive: true },
      orderBy: { prescribedDate: 'desc' },
    });
    res.json({ success: true, data: prescriptions });
  } catch (error) {
    throw error;
  }
}

export async function createPrescription(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const prescription = await prisma.prescription.create({
      data: { ...req.body, petId },
    });
    res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    throw error;
  }
}

// Allergies
export async function getAllergies(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const allergies = await prisma.allergy.findMany({ where: { petId } });
    res.json({ success: true, data: allergies });
  } catch (error) {
    throw error;
  }
}

export async function createAllergy(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const allergy = await prisma.allergy.create({
      data: { ...req.body, petId },
    });
    res.status(201).json({ success: true, data: allergy });
  } catch (error) {
    throw error;
  }
}

// Vital Signs
export async function getVitalSigns(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const vitals = await prisma.vitalSign.findMany({
      where: { petId },
      orderBy: { recordDate: 'desc' },
    });
    res.json({ success: true, data: vitals });
  } catch (error) {
    throw error;
  }
}

export async function createVitalSign(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const vital = await prisma.vitalSign.create({
      data: { ...req.body, petId, recordDate: new Date(req.body.recordDate) },
    });
    res.status(201).json({ success: true, data: vital });
  } catch (error) {
    throw error;
  }
}
