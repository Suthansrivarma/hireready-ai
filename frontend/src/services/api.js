import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hireready_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle expired tokens
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional auto logout clean up if token invalidated
      if (localStorage.getItem('hireready_token')) {
        localStorage.removeItem('hireready_token');
        localStorage.removeItem('hireready_user');
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me')
};

export const analysisAPI = {
  analyze: (formData) => API.post('/analysis/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getRecent: () => API.get('/analysis/recent'),
  getById: (id) => API.get(`/analysis/${id}`),
  delete: (id) => API.delete(`/analysis/${id}`)
};

export const userAPI = {
  getUsage: () => API.get('/user/usage'),
  updateProfile: (data) => API.put('/user/profile', data)
};

export const trackerAPI = {
  getJobs: () => API.get('/tracker'),
  createJob: (data) => API.post('/tracker', data),
  updateJob: (id, data) => API.put(`/tracker/${id}`, data),
  deleteJob: (id) => API.delete(`/tracker/${id}`)
};

export const paymentAPI = {
  createCheckoutSession: (plan) => API.post('/payment/create-checkout-session', { plan })
};

export default API;
