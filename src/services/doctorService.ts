import apiClient from '../api/apiClient';
import type { Doctor } from '../pages/manage-doctor/ManageDoctor.types';

export interface DoctorAdminResponse {
  id: number;
  doctorName?: string;
  email?: string;
  phoneNumber?: string;
  specialtyName?: string;
  clinicName?: string;
  licenseNumber?: string;
  status?: number;
  practiceStartDate?: Date;
  avatar?: string;
}

export const doctorService = {
  getAll: async (page: number = 0, size: number = 10, keyword: string = '', status?: number) => {
    const response = await apiClient.get('/admin/doctors', {
      params: { page, size, search: keyword, status },
    });

    if (response.data && response.data.result) {
      const { content, totalElements } = response.data.result;

      const mappedContent: Doctor[] = (content || []).map(
        (doc: DoctorAdminResponse): Doctor => ({
          id: doc.id,
          avatar: doc.avatar,
          fullName: doc.doctorName || '',
          specialty: doc.specialtyName || '',
          clinicName: doc.clinicName || '',
          licenseNumber: doc.licenseNumber,
          status: doc.status === 1 ? 'VERIFIED' : 'PENDING',
          email: doc.email,
          phone: doc.phoneNumber,

          createdAt: doc.practiceStartDate,
        }),
      );

      return {
        ...response.data,
        result: {
          ...response.data.result,
          content: mappedContent,
          totalElements: totalElements || 0,
        },
      };
    }

    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/admin/doctors/${id}`);
    return response.data;
  },

  approve: async (id: number) => {
    const response = await apiClient.put(`/admin/doctors/${id}/approve`);
    return response.data;
  },

  reject: async (id: number) => {
    const response = await apiClient.put(`/admin/doctors/${id}/reject`);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/doctors/${id}`);
    return response.data;
  },

  lock: async (id: number) => {
    const response = await apiClient.put(`/admin/doctors/${id}/lock`);
    return response.data;
  },
};
