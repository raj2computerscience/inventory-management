import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const inventoryService = {
  getInventory: (page = 1, limit = 10, search = '', deviceType = '') =>
    api.get('/inventory', { params: { page, limit, search, deviceType } }),

  getInventoryById: (id) =>
    api.get(`/inventory/${id}`),

  createInventory: (data) =>
    api.post('/inventory', data),

  updateInventory: (id, data) =>
    api.put(`/inventory/${id}`, data),

  deleteInventory: (id) =>
    api.delete(`/inventory/${id}`),

  importCSV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/inventory/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  getDashboardStats: () =>
    api.get('/inventory/stats/dashboard'),

  exportCSV: () =>
    api.get('/inventory/export/csv', { responseType: 'blob' }),
};

export const authService = {
  register: (email, username, password) =>
    api.post('/auth/register', { email, username, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getCurrentUser: () =>
    api.get('/auth/me'),

  refreshToken: () =>
    api.post('/auth/refresh'),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
