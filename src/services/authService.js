import apiClient from '../api/axios';

const API_BASE_URL = "https://web-bps-api-production-d18c.up.railway.app";
const API_LOGIN_URL = `${API_BASE_URL}/api/login`;
const API_LOGOUT_URL = `${API_BASE_URL}/api/logout`;

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post(API_LOGIN_URL, { email, password });
      return response.data; // user & message
    } catch (error) {
      throw new Error(
        'Gagal login: ' + (error.response?.data?.message || 'Email atau password salah')
      );
    }
  },

  async logout() {
    return { message: 'Logout berhasil (dummy)' };
  }
};
