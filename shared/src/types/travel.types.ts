export enum TravelMode {
  IN_CABIN = 'IN_CABIN',
  CARGO = 'CARGO',
  CAR_SEAT = 'CAR_SEAT',
  CRATE = 'CRATE'
}

export enum ComplianceStatus {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  MISSING = 'MISSING',
  EXPIRING_SOON = 'EXPIRING_SOON'
}

export interface TravelPlan {
  id: string;
  petId: string;
  userId: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  travelMode: TravelMode;
  airline?: string;
  flightNumber?: string;
  notes?: string;
  complianceStatus: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelDocument {
  id: string;
  petId: string;
  travelPlanId?: string;
  documentType: 'HEALTH_CERTIFICATE' | 'VACCINATION_RECORD' | 'MICROCHIP_VERIFICATION' | 'IMPORT_PERMIT' | 'RABIES_TITER' | 'OTHER';
  documentName: string;
  documentUrl: string;
  issueDate: Date;
  expirationDate?: Date;
  issuingAuthority?: string;
  isVerified: boolean;
  status: ComplianceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplianceChecklist {
  id: string;
  petId: string;
  travelPlanId: string;
  items: ComplianceChecklistItem[];
  overallStatus: ComplianceStatus;
  lastUpdated: Date;
}

export interface ComplianceChecklistItem {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  status: ComplianceStatus;
  documentId?: string;
  dueDate?: Date;
  completedDate?: Date;
}

export interface PetIdCard {
  id: string;
  petId: string;
  qrCodeUrl: string;
  cardUrl: string;
  generatedAt: Date;
  expiresAt?: Date;
}
