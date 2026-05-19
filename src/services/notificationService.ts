import apiClient from '../api/apiClient';
import type {
  Notification,
  CreateNotificationPayload,
} from '../pages/manage-notification/ManageNotification.types';

export const notificationService = {
  // Fetch list of notifications
  getNotifications: async (params?: { page?: number; size?: number; search?: string }) => {
    const response = await apiClient.get('/admin/notifications', { params });
    if (response.data && response.data.result) {
      const { content, totalElements } = response.data.result;
      return {
        data: content as Notification[],
        total: totalElements || 0,
      };
    }
    return { data: [], total: 0 };
  },

  // Create a new notification (Draft or Sent)
  createNotification: async (payload: CreateNotificationPayload): Promise<Notification> => {
    const response = await apiClient.post('/admin/notifications', payload);
    if (response.data && response.data.result) {
      return response.data.result as Notification;
    }
    throw new Error('Failed to create notification');
  },

  // Delete notification
  deleteNotification: async (id: string | number): Promise<void> => {
    await apiClient.delete(`/admin/notifications/${id}`);
  },
};
