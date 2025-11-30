import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export async function getUserAppointments(req: AuthRequest, res: Response) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user!.userId },
      include: { pet: true },
      orderBy: { scheduledDate: 'desc' },
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    throw error;
  }
}

export async function createAppointment(req: AuthRequest, res: Response) {
  const { petId, type, scheduledDate, duration, reason, symptoms, clinicId, veterinarianId, isVirtual } = req.body;
  try {
    const appointment = await prisma.appointment.create({
      data: {
        petId,
        userId: req.user!.userId,
        type,
        scheduledDate: new Date(scheduledDate),
        duration,
        reason,
        symptoms,
        clinicId,
        veterinarianId,
        isVirtual,
      },
      include: { pet: true },
    });
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    throw error;
  }
}

export async function getAppointmentById(req: AuthRequest, res: Response) {
  const { appointmentId } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { pet: true, preAppointmentForm: true },
    });
    res.json({ success: true, data: appointment });
  } catch (error) {
    throw error;
  }
}

export async function updateAppointment(req: AuthRequest, res: Response) {
  const { appointmentId } = req.params;
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: req.body,
    });
    res.json({ success: true, data: appointment });
  } catch (error) {
    throw error;
  }
}

export async function cancelAppointment(req: AuthRequest, res: Response) {
  const { appointmentId } = req.params;
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
    });
    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    throw error;
  }
}

export async function getAvailableSlots(req: AuthRequest, res: Response) {
  // TODO: Implement slot availability logic
  res.json({ success: true, data: [] });
}

export async function submitPreAppointmentForm(req: AuthRequest, res: Response) {
  const { appointmentId } = req.params;
  try {
    const form = await prisma.preAppointmentForm.create({
      data: { appointmentId, ...req.body },
    });
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { preAppointmentFormCompleted: true },
    });
    res.status(201).json({ success: true, data: form });
  } catch (error) {
    throw error;
  }
}

export async function getPreAppointmentForm(req: AuthRequest, res: Response) {
  const { appointmentId } = req.params;
  try {
    const form = await prisma.preAppointmentForm.findUnique({
      where: { appointmentId },
    });
    res.json({ success: true, data: form });
  } catch (error) {
    throw error;
  }
}

export async function getVirtualConsultation(req: AuthRequest, res: Response) {
  const { consultationId } = req.params;
  try {
    const consultation = await prisma.virtualConsultation.findUnique({
      where: { id: consultationId },
      include: { appointment: true },
    });
    res.json({ success: true, data: consultation });
  } catch (error) {
    throw error;
  }
}

export async function startVirtualConsultation(req: AuthRequest, res: Response) {
  const { consultationId } = req.params;
  try {
    const consultation = await prisma.virtualConsultation.update({
      where: { id: consultationId },
      data: { status: 'IN_PROGRESS', startTime: new Date() },
    });
    res.json({ success: true, data: consultation });
  } catch (error) {
    throw error;
  }
}

export async function endVirtualConsultation(req: AuthRequest, res: Response) {
  const { consultationId } = req.params;
  try {
    const consultation = await prisma.virtualConsultation.update({
      where: { id: consultationId },
      data: { status: 'COMPLETED', endTime: new Date() },
    });
    res.json({ success: true, data: consultation });
  } catch (error) {
    throw error;
  }
}
