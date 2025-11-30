export enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  RABBIT = 'RABBIT',
  REPTILE = 'REPTILE',
  OTHER = 'OTHER'
}

export enum PetGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed?: string;
  gender: PetGender;
  dateOfBirth?: Date;
  weight?: number;
  weightUnit: 'lbs' | 'kg';
  color?: string;
  microchipId?: string;
  profileImage?: string;
  primaryOwnerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface PetCaregiverAssignment {
  id: string;
  petId: string;
  userId: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  assignedBy: string;
  assignedAt: Date;
  isActive: boolean;
}

export interface CreatePetDto {
  name: string;
  type: PetType;
  breed?: string;
  gender: PetGender;
  dateOfBirth?: Date;
  weight?: number;
  weightUnit?: 'lbs' | 'kg';
  color?: string;
  microchipId?: string;
}

export interface UpdatePetDto extends Partial<CreatePetDto> {
  isActive?: boolean;
}
