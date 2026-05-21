import apiClient from '../api/apiClient';
import type {
  Appointment,
  AppointmentStatus,
} from '../pages/manage-appointment/ManageAppointment.types';

export interface AppointmentBackendResponse {
  id: number;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  appointmentFee: number;
  status: string;
  timeSlot: string;
  diagnosis?: string;
  prescription?: string;
}

export const appointmentService = {
  getAll: async (page: number = 0, size: number = 1000) => {
    const response = await apiClient.get('/admin/appointments', {
      params: { page, size },
    });

    if (response.data && response.data.result) {
      const { content, totalElements } = response.data.result;

      const mappedContent: Appointment[] = (content || []).map(
        (app: AppointmentBackendResponse): Appointment => ({
          id: app.id ? app.id.toString() : Math.random().toString(),
          patientName: app.patientName || '',
          patientPhone: app.patientPhone || '',
          doctorName: app.doctorName || '',
          specialty: app.specialty || '',
          appointmentDate: app.appointmentDate || '',
          timeSlot: app.timeSlot || '',
          totalAmount: app.appointmentFee || 0,
          status: app.status as AppointmentStatus,
          diagnosis: app.diagnosis,
          prescription: app.prescription,
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
};
