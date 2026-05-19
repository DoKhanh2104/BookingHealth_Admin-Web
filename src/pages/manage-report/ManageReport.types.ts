export interface FinancialReportRow {
  appointmentId: string;
  patientName: string;
  doctorName: string;
  amount: number;
  paymentMethod: 'CASH' | 'VNPAY';
  paymentTime: string;
}

export interface PerformanceReportRow {
  id: string;
  doctorOrSpecialtyName: string;
  total: number;
  completed: number;
  cancelled: number;
  cancelRate: number;
}

export interface SatisfactionReportRow {
  id: string;
  doctorName: string;
  specialtyName: string;
  totalReviews: number;
  averageRating: number;
  negativeReviews: number;
}
