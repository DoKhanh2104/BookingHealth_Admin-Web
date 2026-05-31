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
          status:
            doc.status === 1
              ? 'VERIFIED'
              : doc.status === 3
                ? 'LOCKED'
                : doc.status === 2
                  ? 'REJECTED'
                  : 'PENDING',
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
    const response = await apiClient.put(`/admin/doctors/${id}/status`, { status: 1 });
    return response.data;
  },

  reject: async (id: number) => {
    const response = await apiClient.put(`/admin/doctors/${id}/status`, {
      status: 2,
      rejectReason: 'Rejected by Admin',
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/doctors/${id}`);
    return response.data;
  },

  lock: async (id: number) => {
    const response = await apiClient.put(`/admin/doctors/${id}/status`, { status: 3 });
    return response.data;
  },

  getWorkSchedules: async (
    date: string,
    clinicId?: number | 'all',
    doctorId?: number | 'all',
    page: number = 0,
    size: number = 5,
  ) => {
    const response = await apiClient.get('/admin/doctors/work-schedules', {
      params: {
        date,
        clinicId: clinicId === 'all' ? undefined : clinicId,
        doctorId: doctorId === 'all' ? undefined : doctorId,
        page,
        size,
      },
    });
    return response.data;
  },
};
