import apiClient from '../api/apiClient';

export const patientService = {
  getPatients: async (page: number, size: number, search?: string) => {
    const response = await apiClient.get('/admin/patients', {
      params: {
        page,
        size,
        search: search || undefined,
      },
    });
    return response.data;
  },

  toggleLock: async (id: number | string) => {
    const response = await apiClient.patch(`/admin/patients/${id}/toggle-lock`);
    return response.data;
  },

  getAppointments: async (id: number | string, page: number = 0, size: number = 10) => {
    const response = await apiClient.get(`/admin/patients/${id}/appointments`, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  },
};
