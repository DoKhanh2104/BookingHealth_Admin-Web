import apiClient from '../api/apiClient';

export const appointmentSlotService = {
  getAll: async (page: number = 0, size: number = 1000) => {
    const response = await apiClient.get('/admin/appointment-slots', {
      params: { page, size },
    });
    return response.data;
  },

  add: async (startTime: string, endTime: string) => {
    const response = await apiClient.post('/admin/appointment-slots', {
      startTime,
      endTime,
    });
    return response.data;
  },

  update: async (id: number, code: string, startTime: string, endTime: string) => {
    const response = await apiClient.put(`/admin/appointment-slots/${id}`, {
      code,
      startTime,
      endTime,
    });
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/admin/appointment-slots/${id}`);
  },

  updateStatus: async (id: number) => {
    const response = await apiClient.patch(`/admin/appointment-slots/${id}`);
    return response.data;
  },
};
