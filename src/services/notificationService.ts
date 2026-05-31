import apiClient from '../api/apiClient';
import type {
  Notification,
  CreateNotificationPayload,
} from '../pages/manage-notification/ManageNotification.types';

export const notificationService = {
  getNotifications: async (params: { page: number; size: number; search?: string }) => {
    const response = await apiClient.get('/admin/notifications', {
      params: {
        page: params.page - 1, // backend is 0-indexed
        size: params.size,
        search: params.search,
      },
    });

    if (response.data && response.data.result) {
      const { content, totalElements } = response.data.result;
      return {
        data: content as Notification[],
        total: totalElements || 0,
      };
    }
    return { data: [], total: 0 };
  },

  createNotification: async (data: CreateNotificationPayload) => {
    const response = await apiClient.post('/admin/notifications', data);
    return response.data;
  },

  deleteNotification: async (id: number | string) => {
    const response = await apiClient.delete(`/admin/notifications/${id}`);
    return response.data;
  },
};
