import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Conversations
export async function getConversations(req: AuthRequest, res: Response) {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { participants: { has: req.user!.userId } },
      orderBy: { updatedAt: 'desc' },
    });
    res.json({ success: true, data: conversations });
  } catch (error) {
    throw error;
  }
}

export async function createConversation(req: AuthRequest, res: Response) {
  const { participants, petId, clinicId, type } = req.body;
  try {
    const conversation = await prisma.conversation.create({
      data: { participants: [req.user!.userId, ...participants], petId, clinicId, type },
    });
    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    throw error;
  }
}

export async function getConversation(req: AuthRequest, res: Response) {
  const { conversationId } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    res.json({ success: true, data: conversation });
  } catch (error) {
    throw error;
  }
}

// Messages
export async function getMessages(req: AuthRequest, res: Response) {
  const { conversationId } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { sentAt: 'asc' },
    });
    res.json({ success: true, data: messages });
  } catch (error) {
    throw error;
  }
}

export async function sendMessage(req: AuthRequest, res: Response) {
  const { conversationId } = req.params;
  const { content, type, attachments } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: req.user!.userId,
        senderName: `${user!.firstName} ${user!.lastName}`,
        senderType: 'USER',
        type,
        content,
        attachments,
      },
    });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    throw error;
  }
}

export async function markAsRead(req: AuthRequest, res: Response) {
  const { messageId } = req.params;
  try {
    await prisma.message.update({
      where: { id: messageId },
      data: { status: 'READ', readAt: new Date() },
    });
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    throw error;
  }
}

// Notifications
export async function getNotifications(req: AuthRequest, res: Response) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ success: true, data: notifications });
  } catch (error) {
    throw error;
  }
}

export async function markNotificationAsRead(req: AuthRequest, res: Response) {
  const { notificationId } = req.params;
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    throw error;
  }
}

export async function markAllNotificationsAsRead(req: AuthRequest, res: Response) {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    throw error;
  }
}

// Notification Preferences
export async function getNotificationPreferences(req: AuthRequest, res: Response) {
  try {
    let preferences = await prisma.notificationPreferences.findUnique({
      where: { userId: req.user!.userId },
    });
    if (!preferences) {
      preferences = await prisma.notificationPreferences.create({
        data: { userId: req.user!.userId },
      });
    }
    res.json({ success: true, data: preferences });
  } catch (error) {
    throw error;
  }
}

export async function updateNotificationPreferences(req: AuthRequest, res: Response) {
  try {
    const preferences = await prisma.notificationPreferences.upsert({
      where: { userId: req.user!.userId },
      update: req.body,
      create: { userId: req.user!.userId, ...req.body },
    });
    res.json({ success: true, data: preferences });
  } catch (error) {
    throw error;
  }
}
