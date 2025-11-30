export interface Clinic {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  address: Address;
  hours: ClinicHours[];
  services: string[];
  isEmergency: boolean;
  acceptsVirtualConsultations: boolean;
  rating?: number;
  reviewCount?: number;
  profileImage?: string;
  coverImage?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface ClinicHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Veterinarian {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  licenseNumber: string;
  specialties: string[];
  bio?: string;
  profileImage?: string;
  clinicId?: string;
  isAvailableForVirtual: boolean;
  rating?: number;
  reviewCount?: number;
  yearsOfExperience?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  clinicId?: string;
  veterinarianId?: string;
  userId: string;
  rating: number;
  title?: string;
  comment?: string;
  appointmentId?: string;
  isVerified: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
