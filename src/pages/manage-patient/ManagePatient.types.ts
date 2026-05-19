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
