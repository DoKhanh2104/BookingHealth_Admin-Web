import apiClient from '../api/apiClient';
import type { ClinicRequestPayload } from '../pages/manage-clinic/ManageClinic.types';

export const clinicService = {
  getAll: async (page: number = 0, size: number = 10, keyword: string = '') => {
    const response = await apiClient.get('/admin/clinics', {
      params: { page, size, name: keyword },
    });
    return response.data;
  },

  create: async (data: ClinicRequestPayload) => {
    const response = await apiClient.post('/admin/clinics', data);
    return response.data;
  },

  update: async (id: number, data: ClinicRequestPayload) => {
    const response = await apiClient.put(`/admin/clinics/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/clinics/${id}`);
    return response.data;
  },

  getGeocoding: async (address: string) => {
    const response = await apiClient.get('/admin/clinics/geocode', {
      params: { address },
    });
    return response.data; // expects ApiResponse<GeocodingResponse>
  },
};
