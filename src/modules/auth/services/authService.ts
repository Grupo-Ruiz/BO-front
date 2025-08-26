import { STORAGE_KEYS } from '@/modules/shared/config/api';
import type { LoginCredentials } from '../types';

import type { User } from '@/modules/users';
import type { AuthUser } from '../types';

export interface LoginResponse {
  success: boolean;
  data?: AuthUser & { token: string };
  error?: string;
}

/**
 * Servicio para realizar login con la API local de Recaudadora
 */
export const loginWithApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Datos simulados para pruebas sin API
  const mockUsers: User[] = [
    {
      id: 1,
      nombre: 'Admin',
      apellidos: 'User',
      email: 'admin@yurni.com',
      password: '123456',
      telefono: '+34 600 000 000',
      activo: true,
      delegacion_id: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      deleted_at: null
    },
    {
      id: 2,
      nombre: 'Operador',
      apellidos: 'Demo',
      email: 'operador@yurni.com',
      password: '123456',
      telefono: '+34 600 111 111',
      activo: true,
      delegacion_id: 9,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      deleted_at: null
    }
  ];

  const user = mockUsers.find(u => u.email === credentials.email && credentials.password === u.password);

  if (user) {
    // Generar token simulado
    const token = 'mock-token-' + user.id;
    // Mapear User a AuthUser (sin password)
    const authUser: AuthUser = {
      id: String(user.id),
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
      delegacion_id: credentials.delegacion_id,
    };

    const dataToStore = { ...authUser, token };
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(dataToStore));
    return {
      success: true,
      data: dataToStore
    };
  } else {
    return {
      success: false,
      error: 'Credenciales inválidas',
    };
  }
};

/**
 * Servicio para realizar logout con la API
 */
export const logoutWithApi = async (): Promise<boolean> => {
  // Simulación de logout sin API
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  return true;
};