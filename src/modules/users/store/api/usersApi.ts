import { createApiClient } from "@/modules/shared/services/apiClient";
import type { User, CreateUserData, UpdateUserData, UsersPaginatedResponse } from '../../types';

const BASE_MODULE = 'usuarios';
const BASE_URL = `/${BASE_MODULE}`;
const usersApiClient = createApiClient('MAIN');

// API de Usuarios
export const usersApi = {
  
  // Obtener usuarios paginados (con ?page, ?per_page, etc)
  getPaginated: async (params?: any): Promise<UsersPaginatedResponse> => {
    const response = await usersApiClient.get(`${BASE_URL}/users`, {
      params: {
        paginate: true,
        ...params
      }
    });
    return response.data;
  },

  // Crear usuario (registro)
  create: async (userData: CreateUserData): Promise<User> => {
    const response = await usersApiClient.post(`${BASE_URL}/register`, userData);
    return response.data;
  },

  // Actualizar usuario (PUT)
  update: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await usersApiClient.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  // Actualización parcial de usuario (PATCH)
  patch: async (id: string, userData: Partial<UpdateUserData>): Promise<User> => {
    const response = await usersApiClient.patch(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario (soft delete)
  delete: async (id: string): Promise<void> => {
    await usersApiClient.delete(`${BASE_URL}/users/${id}`);
  },

  // Restaurar usuario soft-deleted
  restore: async (id: string): Promise<void> => {
    await usersApiClient.post(`${BASE_URL}/users/${id}/restore`);
  },

  // Obtener sedes/headquarters
  getHeadquarters: async (): Promise<any[]> => {
    const response = await usersApiClient.get(`${BASE_URL}/headquarters`);
    return response.data;
  }
};
