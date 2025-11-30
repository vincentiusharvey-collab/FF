import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Care Tasks
export async function getCareTasks(req: AuthRequest, res: Response) {
  try {
    const tasks = await prisma.careTask.findMany({
      where: { assignedTo: req.user!.userId },
      include: { pet: true },
      orderBy: { scheduledTime: 'asc' },
    });
    res.json({ success: true, data: tasks });
  } catch (error) {
    throw error;
  }
}

export async function createCareTask(req: AuthRequest, res: Response) {
  try {
    const task = await prisma.careTask.create({
      data: { ...req.body, assignedBy: req.user!.userId },
      include: { pet: true },
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    throw error;
  }
}

export async function updateCareTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  try {
    const task = await prisma.careTask.update({
      where: { id: taskId },
      data: req.body,
    });
    res.json({ success: true, data: task });
  } catch (error) {
    throw error;
  }
}

export async function completeCareTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  try {
    const task = await prisma.careTask.update({
      where: { id: taskId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        completedBy: req.user!.userId,
      },
    });
    res.json({ success: true, data: task });
  } catch (error) {
    throw error;
  }
}

export async function deleteCareTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  try {
    await prisma.careTask.delete({ where: { id: taskId } });
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    throw error;
  }
}

// Medication Reminders
export async function getMedicationReminders(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const reminders = await prisma.medicationReminder.findMany({
      where: { petId, isActive: true },
    });
    res.json({ success: true, data: reminders });
  } catch (error) {
    throw error;
  }
}

export async function createMedicationReminder(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const reminder = await prisma.medicationReminder.create({
      data: { ...req.body, petId },
    });
    res.status(201).json({ success: true, data: reminder });
  } catch (error) {
    throw error;
  }
}

export async function updateMedicationReminder(req: AuthRequest, res: Response) {
  const { reminderId } = req.params;
  try {
    const reminder = await prisma.medicationReminder.update({
      where: { id: reminderId },
      data: req.body,
    });
    res.json({ success: true, data: reminder });
  } catch (error) {
    throw error;
  }
}

export async function deleteMedicationReminder(req: AuthRequest, res: Response) {
  const { reminderId } = req.params;
  try {
    await prisma.medicationReminder.update({
      where: { id: reminderId },
      data: { isActive: false },
    });
    res.json({ success: true, message: 'Reminder deleted successfully' });
  } catch (error) {
    throw error;
  }
}

export async function logMedication(req: AuthRequest, res: Response) {
  const { reminderId } = req.params;
  try {
    const reminder = await prisma.medicationReminder.findUnique({ where: { id: reminderId } });
    const log = await prisma.medicationLog.create({
      data: {
        reminderId,
        petId: reminder!.petId,
        administeredBy: req.user!.userId,
        administeredAt: new Date(),
        ...req.body,
      },
    });
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    throw error;
  }
}

// Wellness Reminders
export async function getWellnessReminders(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const reminders = await prisma.wellnessReminder.findMany({
      where: { petId },
      orderBy: { dueDate: 'asc' },
    });
    res.json({ success: true, data: reminders });
  } catch (error) {
    throw error;
  }
}

export async function createWellnessReminder(req: AuthRequest, res: Response) {
  const { petId } = req.params;
  try {
    const reminder = await prisma.wellnessReminder.create({
      data: { ...req.body, petId },
    });
    res.status(201).json({ success: true, data: reminder });
  } catch (error) {
    throw error;
  }
}

// Refill Requests
export async function getRefillRequests(req: AuthRequest, res: Response) {
  try {
    const requests = await prisma.refillRequest.findMany({
      where: { requestedBy: req.user!.userId },
      include: { prescription: true },
      orderBy: { requestedAt: 'desc' },
    });
    res.json({ success: true, data: requests });
  } catch (error) {
    throw error;
  }
}

export async function createRefillRequest(req: AuthRequest, res: Response) {
  try {
    const request = await prisma.refillRequest.create({
      data: { ...req.body, requestedBy: req.user!.userId },
      include: { prescription: true },
    });
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    throw error;
  }
}

export async function updateRefillRequest(req: AuthRequest, res: Response) {
  const { requestId } = req.params;
  try {
    const request = await prisma.refillRequest.update({
      where: { id: requestId },
      data: req.body,
    });
    res.json({ success: true, data: request });
  } catch (error) {
    throw error;
  }
}
