import { STORAGE_KEYS } from '../../../shared/config/api';
import type { LoginCredentials, AuthUser } from '../types';
import { COMPANIES } from '../../../shared/data/companies.ts';

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    id: number;
    name: string;
    email: string;
    role_id: number;
    sede_id: number;
  };
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Servicio para realizar login con la API local de Recaudadora
 */
export const loginWithApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Datos simulados para pruebas sin API
  const mockUsers = [
    {
      token: 'mock-token-admin',
      id: 1,
      name: 'Admin User',
      email: 'admin@yurni.com',
      role_id: 1,
      sede_id: 1,
      // El admin tiene acceso a todas las empresas
      companies: COMPANIES,
    },
    {
      token: 'mock-token-operator',
      id: 2,
      name: 'Operador',
      email: 'operador@yurni.com',
      role_id: 2,
      sede_id: 2,
      // El operador solo a la segunda empresa
      companies: [COMPANIES[1]],
    }
  ];
  const user = mockUsers.find(u => u.email === credentials.email && credentials.password === '123456');
  if (user && credentials.companyId) {
    // Buscar la empresa seleccionada
    const company = COMPANIES.find(c => String(c.id) === String(credentials.companyId));
    const userWithCompany = {
      ...user,
      companyId: credentials.companyId,
      company: company || null,
      companies: user.companies // lista de empresas a las que tiene acceso
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, user.token);
    localStorage.setItem('yurni_auth_user', JSON.stringify(userWithCompany));
    return {
      success: true,
      data: userWithCompany
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
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  return true;
};

/**
 * Convierte un usuario de la API en un objeto AuthUser
 */
export function fromApiUser(apiUser: any): AuthUser {
  if (!apiUser) {
    throw new Error('No se recibieron datos del usuario');
  }
  const roleMap: Record<number, 'admin' | 'operator'> = {
    1: 'admin',
    2: 'operator',
  };
  const permissionsMap: Record<number, string[]> = {
    1: [
      'users:read', 'users:write', 'users:delete',
      'clients:read', 'clients:write', 'clients:delete',
      'wallet:read', 'wallet:write',
      'analytics:read', 'analytics:write',
      'operations:read', 'operations:write',
      'payments:read', 'payments:write', 'payments:refund',
      'sae:read', 'sae:write',
      'faqs:read', 'faqs:write',
      'kpis:read',
      'dashboard:read'
    ],
    2: [
      'users:read',
      'clients:read', 'clients:write',
      'wallet:read',
      'operations:read', 'operations:write',
      'payments:read',
      'sae:read', 'sae:write',
      'faqs:read', 'faqs:write',
      'dashboard:read'
    ]
  };
  // Buscar la empresa seleccionada
  const companyId = (apiUser as any).companyId || '';
  const company = COMPANIES.find(c => String(c.id) === String(companyId));

  return {
    id: apiUser.id.toString(),
    email: apiUser.email,
    name: apiUser.name,
    role: roleMap[apiUser.role_id] || 'operator',
    permissions: permissionsMap[apiUser.role_id] || [],
    companyId,
    company,
  };
}