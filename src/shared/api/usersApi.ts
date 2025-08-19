import { createApiClient } from '../services/apiClient';
import { API_ENDPOINTS } from '../config/api';

// Cliente API para usuarios
const usersApiClient = createApiClient('MAIN');

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  roleName: string;
  sedeName: string;
  roleId: string;
  sedeId: string;
  status: string;
  createdAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  roleId: string;
  sedeId: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  roleId?: string;
  sedeId?: string;
  status?: string;
}

interface PaginatedResponse<T> {
  users: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

interface Role {
  id: string;
  name: string;
}

interface Sede {
  id: string;
  name: string;
  address: string;
}

// API de Usuarios
export const usersApi = {
  // Obtener todos los usuarios
  getAll: async (params?: any): Promise<User[]> => {
    const response = await usersApiClient.get(API_ENDPOINTS.USERS_FRONT, { params });
    return response.data;
  },

  // Obtener usuarios paginados
  getPaginated: async (params?: any): Promise<PaginatedResponse<User>> => {
    const response = await usersApiClient.get(API_ENDPOINTS.USERS_FRONT, { 
      params: {
        paginate: true,
        ...params
      }
    });
    return response.data;
  },

  // Obtener usuario por ID
  getById: async (id: string): Promise<User> => {
    const response = await usersApiClient.get(`${API_ENDPOINTS.USERS_FRONT}/${id}`);
    return response.data;
  },

  // Crear usuario
  create: async (userData: CreateUserData): Promise<User> => {
    const response = await usersApiClient.post(API_ENDPOINTS.USERS, userData);
    return response.data;
  },

  // Actualizar usuario
  update: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await usersApiClient.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario
  delete: async (id: string): Promise<void> => {
    await usersApiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },

  // Obtener roles
  getRoles: async (): Promise<Role[]> => {
    const response = await usersApiClient.get(API_ENDPOINTS.ROLES);
    return response.data;
  },

  // Obtener sedes/headquarters
  getHeadquarters: async (): Promise<Sede[]> => {
    const response = await usersApiClient.get(API_ENDPOINTS.HEADQUARTERS);
    return response.data;
  }
};
