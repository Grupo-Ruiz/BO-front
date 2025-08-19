import { createApiClient } from '../services/apiClient';
import { API_ENDPOINTS } from '../config/api';

// Cliente API para autenticación
const authApiClient = createApiClient('MAIN');

// Tipos
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    roleName: string;
    sedeName: string;
    roleId: string;
    sedeId: string;
  };
  token: string;
}

// API de Autenticación
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApiClient.post(API_ENDPOINTS.LOGIN, credentials);
    
    // Guardar token en localStorage
    if (response.data.token) {
      localStorage.setItem('yurni_auth_token', response.data.token);
      localStorage.setItem('yurni_auth_user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await authApiClient.post(API_ENDPOINTS.LOGOUT);
    } finally {
      // Limpiar localStorage independientemente del resultado
      localStorage.removeItem('yurni_auth_token');
      localStorage.removeItem('yurni_auth_user');
    }
  },

  // Verificar token
  verifyToken: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('yurni_auth_token');
      if (!token) return false;
      
      // Hacer una petición simple para verificar el token
      await authApiClient.get('/user');
      return true;
    } catch (error) {
      return false;
    }
  },

  // Obtener usuario actual desde localStorage
  getCurrentUser: () => {
    try {
      const userString = localStorage.getItem('yurni_auth_user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      return null;
    }
  }
};
