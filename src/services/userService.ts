import apiClient from '../api/apiClient';
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from '../pages/manage-user/ManageUser.types';

export const userService = {
  getUsers: async (params: { page: number; size: number; search?: string; status?: string }) => {
    const response = await apiClient.get('/admin/users', {
      params: {
        page: params.page,
        size: params.size,
        search: params.search,
        status: params.status === 'all' ? undefined : params.status,
      },
    });

    if (response.data && response.data.result) {
      const { content, totalElements } = response.data.result;

      const mappedUsers: User[] = (content || []).map(
        (user: User): User => ({
          ...user,
          phoneNumber: user.phone,
          role: user.roles?.[0]?.roleName || 'N/A',
          status: user.status === 1 ? 'Active' : 'Inactive',
        }),
      );

      return {
        data: mappedUsers,
        total: totalElements || 0,
      };
    }

    return { data: [], total: 0 };
  },

  // createUser
  createUser: async (data: CreateUserPayload | FormData) => {
    const response = await apiClient.post('/admin/users', data);
    return response.data;
  },

  // updateUser
  updateUser: async (id: number | string, data: UpdateUserPayload | FormData) => {
    const response = await apiClient.put(`/admin/users/${id}`, data);
    return response.data;
  },

  // deleteUser
  deleteUser: async (id: number | string) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },
};
