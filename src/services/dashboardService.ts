import apiClient from '../api/apiClient';

// ─────────────────────────────────────────────
// Request param types
// ─────────────────────────────────────────────

export type PeriodFilter = 'day' | 'week' | 'month';
export type RevenueFilter = 'week' | 'month' | 'year';

export interface DashboardSummary {
  totalBookings: number;
  newDoctors: number;
  newUsers: number;
  totalRevenue: number;
}

export interface RevenueChartData {
  labels: string[];
  data: number[];
}

export interface BookingStatusItem {
  pending: number;
  completed: number;
  cancelled: number;
}

export interface SpecialtyDistributionItem {
  category: string;
  value: number;
}

export interface TopDoctorItem {
  name: string;
  spec: string;
  rating: number;
  bookings: number;
  avatar: string;
}

export interface RecentFeedbackItem {
  id: number;
  patientName: string;
  doctorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PendingDoctorItem {
  id: number;
  name: string;
  spec: string;
  date: string;
  certStatus: string;
}

// ─────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────

export const dashboardService = {
  getSummary: async (period: PeriodFilter = 'day'): Promise<DashboardSummary> => {
    const response = await apiClient.get('/admin/dashboard/summary', { params: { period } });
    return response.data?.result ?? response.data;
  },

  getRevenueChart: async (filter: RevenueFilter = 'week'): Promise<RevenueChartData> => {
    const response = await apiClient.get('/admin/dashboard/revenue', { params: { filter } });
    return response.data?.result ?? response.data;
  },

  getBookingStatus: async (period: PeriodFilter = 'day'): Promise<BookingStatusItem> => {
    const response = await apiClient.get('/admin/dashboard/booking-status', { params: { period } });
    return response.data?.result ?? response.data;
  },

  getSpecialtyDistribution: async (
    period: PeriodFilter = 'day',
  ): Promise<SpecialtyDistributionItem[]> => {
    const response = await apiClient.get('/admin/dashboard/specialty-distribution', {
      params: { period },
    });
    return response.data?.result ?? response.data ?? [];
  },

  getTopDoctors: async (period: PeriodFilter = 'day'): Promise<TopDoctorItem[]> => {
    const response = await apiClient.get('/admin/dashboard/top-doctors', { params: { period } });
    return response.data?.result ?? response.data ?? [];
  },

  getRecentFeedbacks: async (): Promise<RecentFeedbackItem[]> => {
    const response = await apiClient.get('/admin/dashboard/recent-feedbacks');
    return response.data?.result ?? response.data ?? [];
  },

  getPendingDoctors: async (): Promise<PendingDoctorItem[]> => {
    const response = await apiClient.get('/admin/dashboard/pending-doctors');
    return response.data?.result ?? response.data ?? [];
  },
};
