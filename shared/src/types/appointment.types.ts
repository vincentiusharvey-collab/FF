export enum AppointmentType {
  IN_PERSON_WELLNESS = 'IN_PERSON_WELLNESS',
  IN_PERSON_SICK_VISIT = 'IN_PERSON_SICK_VISIT',
  IN_PERSON_PROCEDURE = 'IN_PERSON_PROCEDURE',
  IN_PERSON_FOLLOW_UP = 'IN_PERSON_FOLLOW_UP',
  IN_PERSON_EMERGENCY = 'IN_PERSON_EMERGENCY',
  VIRTUAL_CONSULTATION = 'VIRTUAL_CONSULTATION',
  VIRTUAL_FOLLOW_UP = 'VIRTUAL_FOLLOW_UP',
  VIRTUAL_URGENT_CARE = 'VIRTUAL_URGENT_CARE'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  RESCHEDULED = 'RESCHEDULED'
}

export interface Appointment {
  id: string;
  petId: string;
  userId: string;
  type: AppointmentType;
  status: AppointmentStatus;
  scheduledDate: Date;
  duration: number;
  reason?: string;
  symptoms?: string[];
  notes?: string;
  veterinarianId?: string;
  veterinarianName?: string;
  clinicId?: string;
  clinicName?: string;
  isVirtual: boolean;
  videoRoomId?: string;
  preAppointmentFormCompleted: boolean;
  reminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentSlot {
  id: string;
  clinicId: string;
  veterinarianId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  appointmentType: AppointmentType;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
}

export interface PreAppointmentForm {
  id: string;
  appointmentId: string;
  petId: string;
  symptoms: string[];
  symptomDuration?: string;
  appetite: 'NORMAL' | 'INCREASED' | 'DECREASED' | 'NONE';
  energy: 'NORMAL' | 'INCREASED' | 'DECREASED';
  behaviorChanges?: string;
  medications?: string[];
  additionalNotes?: string;
  photos?: string[];
  completedAt: Date;
}

export interface VirtualConsultation {
  id: string;
  appointmentId: string;
  petId: string;
  veterinarianId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  videoRoomId: string;
  chatTranscript?: ChatMessage[];
  consultationNotes?: string;
  followUpRequired: boolean;
  prescriptionsIssued?: string[];
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  attachments?: string[];
}

export interface AppointmentReminder {
  id: string;
  appointmentId: string;
  userId: string;
  reminderType: 'EMAIL' | 'SMS' | 'PUSH';
  scheduledFor: Date;
  sentAt?: Date;
  status: 'PENDING' | 'SENT' | 'FAILED';
}
