export enum MedicalRecordType {
  VACCINATION = 'VACCINATION',
  LAB_RESULT = 'LAB_RESULT',
  VISIT_SUMMARY = 'VISIT_SUMMARY',
  PRESCRIPTION = 'PRESCRIPTION',
  PROCEDURE = 'PROCEDURE',
  DIAGNOSIS = 'DIAGNOSIS',
  ALLERGY = 'ALLERGY',
  VITAL_SIGNS = 'VITAL_SIGNS',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT'
}

export enum VaccinationStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  DUE_SOON = 'DUE_SOON',
  OVERDUE = 'OVERDUE',
  NOT_STARTED = 'NOT_STARTED'
}

export interface MedicalRecord {
  id: string;
  petId: string;
  type: MedicalRecordType;
  title: string;
  description?: string;
  date: Date;
  veterinarianName?: string;
  clinicName?: string;
  attachments: MedicalRecordAttachment[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface MedicalRecordAttachment {
  id: string;
  recordId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  name: string;
  administeredDate: Date;
  expirationDate?: Date;
  nextDueDate?: Date;
  status: VaccinationStatus;
  veterinarianName?: string;
  clinicName?: string;
  batchNumber?: string;
  recordId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  petId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  prescribedDate: Date;
  startDate: Date;
  endDate?: Date;
  refillsRemaining?: number;
  veterinarianName: string;
  clinicName?: string;
  recordId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Allergy {
  id: string;
  petId: string;
  allergen: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  symptoms?: string;
  diagnosedDate?: Date;
  notes?: string;
  recordId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VitalSigns {
  id: string;
  petId: string;
  recordDate: Date;
  temperature?: number;
  temperatureUnit: 'F' | 'C';
  heartRate?: number;
  respiratoryRate?: number;
  weight?: number;
  weightUnit: 'lbs' | 'kg';
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  notes?: string;
  recordId?: string;
  createdAt: Date;
}

export interface MedicalRecordShare {
  id: string;
  recordId: string;
  petId: string;
  sharedBy: string;
  sharedWith?: string;
  shareMethod: 'EMAIL' | 'SMS' | 'LINK' | 'APP_INVITATION';
  recipient: string;
  permissions: 'READ_ONLY' | 'FULL_ACCESS';
  expiresAt?: Date;
  accessCount: number;
  lastAccessedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecordAccessLog {
  id: string;
  recordId: string;
  userId?: string;
  shareId?: string;
  action: 'VIEW' | 'DOWNLOAD' | 'SHARE' | 'UPDATE' | 'DELETE';
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}
