import api from './api';

const authService = {
  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: 'Registration failed' };
    }
  },
  login: async (userData) => {
    try {
      const res = await api.post('/auth/login', userData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: 'Login failed' };
    }
  }
};

export default authService;
