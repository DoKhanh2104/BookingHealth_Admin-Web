import apiClient from '../api/apiClient';
import type { SpecialtyRequestPayload } from '../pages/manage-specialty/ManageSpecialty.types';

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const specialtyService = {
  getAll: async (page: number = 0, size: number = 10) => {
    const response = await apiClient.get('/admin/specialties', {
      params: { page, size },
    });
    return response.data;
  },

  create: async (data: SpecialtyRequestPayload) => {
    const response = await apiClient.post('/admin/specialties', data);
    return response.data;
  },

  update: async (id: number, data: SpecialtyRequestPayload) => {
    const response = await apiClient.put(`/admin/specialties/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/specialties/${id}`);
    return response.data;
  },
};
