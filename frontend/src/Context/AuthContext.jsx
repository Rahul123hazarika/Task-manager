import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user from localStorage (or API) on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (formData) => {
    const res = await authService.register(formData);
    setIsAuthenticated(true);
    setUser(res.user || res); // Save returned user info
    localStorage.setItem('user', JSON.stringify(res.user || res));
    return res;
  };

  const login = async (formData) => {
    const res = await authService.login(formData);
    setIsAuthenticated(true);
    setUser(res.user || res); // Save returned user info
    localStorage.setItem('user', JSON.stringify(res.user || res));
    return res;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
