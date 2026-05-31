export interface FinancialReportRow {
  appointmentId: number;
  patientName: string;
  doctorName: string;
  amount: number;
  paymentMethod: string;
  paymentTime: string;
}

export interface PerformanceReportRow {
  id: number;
  doctorOrSpecialtyName: string;
  total: number;
  completed: number;
  cancelled: number;
  cancelRate: number;
}

export interface SatisfactionReportRow {
  id: number;
  doctorName: string;
  specialtyName: string;
  totalReviews: number;
  averageRating: number;
  negativeReviews: number;
}
