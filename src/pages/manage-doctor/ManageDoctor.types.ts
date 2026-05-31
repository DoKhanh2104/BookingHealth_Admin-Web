export type DoctorStatus = 'VERIFIED' | 'PENDING' | 'LOCKED' | 'REJECTED';

export interface Doctor {
  id: number;
  avatar?: string;
  fullName: string;
  specialty: string;
  clinicId?: number;
  clinicName?: string;
  licenseNumber?: string;
  status: DoctorStatus;
  email?: string;
  phone?: string;
  description?: string;
  createdAt?: Date;
}
