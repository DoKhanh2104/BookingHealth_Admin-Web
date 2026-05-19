export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string; // ISO format or DD/MM/YYYY
  timeSlot: string;
  totalAmount: number;
  status: AppointmentStatus;
  diagnosis?: string;
  prescription?: string;
}

export interface KpiData {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}
