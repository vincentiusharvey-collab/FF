export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM'
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export interface Conversation {
  id: string;
  participants: string[];
  petId?: string;
  clinicId?: string;
  type: 'USER_TO_CLINIC' | 'USER_TO_USER' | 'GROUP';
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'USER' | 'VETERINARIAN' | 'STAFF' | 'SYSTEM';
  type: MessageType;
  content: string;
  attachments?: MessageAttachment[];
  status: MessageStatus;
  replyTo?: string;
  metadata?: Record<string, any>;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'APPOINTMENT' | 'MEDICATION' | 'MESSAGE' | 'REMINDER' | 'ALERT' | 'SYSTEM';
  title: string;
  body: string;
  data?: Record<string, any>;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isRead: boolean;
  actionUrl?: string;
  expiresAt?: Date;
  createdAt: Date;
  readAt?: Date;
}

export interface NotificationPreferences {
  userId: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  appointmentReminders: boolean;
  medicationReminders: boolean;
  messageNotifications: boolean;
  wellnessReminders: boolean;
  marketingEmails: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  updatedAt: Date;
}
