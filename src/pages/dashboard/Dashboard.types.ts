import { useDashboardHooks } from './Dashboard.hooks';

export type DashboardHooksType = ReturnType<typeof useDashboardHooks>;

export interface PendingDoctor {
  id: number;
  name: string;
  spec: string;
  date: string;
  certStatus: string;
}

export interface TopDoctor {
  name: string;
  spec: string;
  rating: number;
  bookings: number;
  avatar: string;
}

export interface RecentFeedback {
  id: number;
  patientName: string;
  doctorName: string;
  rating: number;
  comment: string;
  date: string;
}
