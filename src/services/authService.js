import apiClient from '../api/axios';

const API_BASE_URL = "https://web-bps-pbw-production.up.railway.app";
const API_CSRF_URL = `${API_BASE_URL}/sanctum/csrf-cookie`;
const API_LOGIN_URL = `${API_BASE_URL}/api/login`;
const API_LOGOUT_URL = `${API_BASE_URL}/api/logout`;

export const authService = {
  async login(email, password) {
    try {
      // ⬇️ Tambahkan ini dulu supaya Sanctum mengatur CSRF cookie
      await apiClient.get(API_CSRF_URL, { withCredentials: true });

      const response = await apiClient.post(API_LOGIN_URL, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(
        'Gagal login: ' + (error.response?.data?.message || 'Terjadi kesalahan')
      );
    }
  },

  async logout() {
    try {
      const response = await apiClient.post(
        API_LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      throw new Error(
        'Gagal logout: ' + (error.response?.data?.message || 'Terjadi kesalahan')
      );
    }
  }
};
