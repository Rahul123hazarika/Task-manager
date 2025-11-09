export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile'
  },
  TASKS: {
    GET_ALL: '/tasks',
    CREATE: '/tasks',
    GET_ONE: '/tasks/:id',
    UPDATE: '/tasks/:id',
    DELETE: '/tasks/:id'
  }
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  PHONE: /^[0-9]{10}$/
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_info'
};
