import apiClient from '../api/axios';

export const authService = {
  async login(email, password) {
    try {
      // Dapatkan CSRF token dulu (WAJIB untuk Sanctum)
      await apiClient.get('/sanctum/csrf-cookie');

      // Lanjut login
      const response = await apiClient.post('/api/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Gagal login: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
    }
  },

  async logout() {
    try {
      const response = await apiClient.post('/api/logout');
      return response.data;
    } catch (error) {
      throw new Error('Gagal logout: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
    }
  }
};
