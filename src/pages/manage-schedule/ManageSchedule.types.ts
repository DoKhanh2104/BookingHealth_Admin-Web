export interface LeaveRequest {
  id: string;
  doctorId: number;
  doctorName: string;
  clinicName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface WorkSchedule {
  id: string;
  doctorId: number;
  doctorName: string;
  clinicId: number;
  clinicName: string;
  date: string;
  timeSlots: string[];
}

export interface TimeSlotConfig {
  id: string;
  code: string; // maKhungGio
  startTime: string; // thoiGianBatDau
  endTime: string; // thoiGianKetThuc
  isActive: boolean; // trangThaiDat (0/1 represented as boolean)
}
