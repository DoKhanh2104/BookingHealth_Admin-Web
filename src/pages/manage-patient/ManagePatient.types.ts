export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'LOCKED';
  createdAt: string;
}

export interface PatientAppointment {
  id: string;
  doctorName: string;
  clinicName: string;
  date: string;
  timeSlot: string;
  status: 'COMPLETED' | 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'NO_SHOW';
}

export interface BackendPatient {
  id: number | string;
  name?: string;
  phone?: string;
  email?: string;
  status?: number;
}

export interface BackendAppointment {
  id: number | string;
  doctor?: {
    name?: string;
    clinic?: {
      clinicName?: string;
    };
  };
  appointmentSlot?: {
    startTime?: string;
    endTime?: string;
  };
  expectedExaminationDate?: string;
  status: number;
}
