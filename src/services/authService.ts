import apiClient from '../api/apiClient';

export interface LoginPayload {
  username?: string;
  password?: string;
}

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
