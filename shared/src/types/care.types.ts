export enum CareTaskType {
  MEDICATION = 'MEDICATION',
  FEEDING = 'FEEDING',
  EXERCISE = 'EXERCISE',
  GROOMING = 'GROOMING',
  INSULIN_SHOT = 'INSULIN_SHOT',
  CUSTOM = 'CUSTOM'
}

export enum CareTaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
  CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface CareTask {
  id: string;
  petId: string;
  type: CareTaskType;
  title: string;
  description?: string;
  assignedTo: string;
  assignedBy: string;
  scheduledTime: Date;
  dueTime?: Date;
  completedAt?: Date;
  completedBy?: string;
  status: CareTaskStatus;
  priority: TaskPriority;
  recurring: boolean;
  recurrencePattern?: RecurrencePattern;
  dosage?: string;
  medication?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurrencePattern {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  interval: number;
  daysOfWeek?: number[];
  endDate?: Date;
  occurrences?: number;
}

export interface MedicationReminder {
  id: string;
  petId: string;
  prescriptionId?: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate?: Date;
  reminderEnabled: boolean;
  notificationMethod: ('PUSH' | 'EMAIL' | 'SMS')[];
  assignedTo: string[];
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicationLog {
  id: string;
  reminderId: string;
  petId: string;
  administeredAt: Date;
  administeredBy: string;
  dosageGiven: string;
  notes?: string;
  wasOnTime: boolean;
  createdAt: Date;
}

export interface WellnessReminder {
  id: string;
  petId: string;
  type: 'VACCINATION' | 'CHECKUP' | 'GROOMING' | 'DENTAL' | 'CUSTOM';
  title: string;
  description?: string;
  dueDate: Date;
  reminderDate: Date;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  notificationSent: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefillRequest {
  id: string;
  petId: string;
  prescriptionId: string;
  medicationName: string;
  requestedBy: string;
  requestedAt: Date;
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'FILLED';
  clinicId?: string;
  pharmacyId?: string;
  deliveryMethod?: 'PICKUP' | 'DELIVERY' | 'MAIL';
  deliveryAddress?: string;
  approvedAt?: Date;
  filledAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
