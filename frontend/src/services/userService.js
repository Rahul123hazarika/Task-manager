import api from './api';
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from '../utils/constants';

const userService = {
  getProfile: async () => {
    try {
      const response = await api.get(ENDPOINTS.USERS.PROFILE);
      return response.data.user;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put(ENDPOINTS.USERS.UPDATE_PROFILE, userData);
      if (response.data.user) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.data.user));
      }
      return response.data.user;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  deleteAccount: async () => {
    try {
      const response = await api.delete(ENDPOINTS.USERS.PROFILE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete account' };
    }
  }
};

export default userService;
