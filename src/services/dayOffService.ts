import apiClient from '../api/apiClient';

export interface DayOffItem {
  id: number;
  doctorId: number;
  doctorName: string;
  clinicName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: number; // 0=PENDING, 1=APPROVED, 2=REJECTED
}

export const dayOffService = {
  getAll: async (status?: number | null, page: number = 0, size: number = 10) => {
    const params: Record<string, number> = { page, size };
    if (status !== null && status !== undefined) {
      params.status = status;
    }
    const response = await apiClient.get('/admin/day-offs', { params });
    return response.data;
  },

  approve: async (id: number) => {
    const response = await apiClient.put(`/admin/day-offs/${id}/approve`);
    return response.data;
  },

  reject: async (id: number) => {
    const response = await apiClient.put(`/admin/day-offs/${id}/reject`);
    return response.data;
  },
};
