import { STORAGE_KEYS } from '../../../shared/config/api';
import type { LoginCredentials } from '../types';
import { COMPANIES } from '../../../shared/data/companies.ts';

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    id: string;
    name: string;
    email: string;
    companies: any[];
    companyId?: string;
    company?: any;
  };
  error?: string;
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
      companies: COMPANIES,
    },
    {
      token: 'mock-token-operator',
      id: 2,
      name: 'Operador',
      email: 'operador@yurni.com',
      companies: [COMPANIES[1]],
    }
  ];
// ...existing code...
  const user = mockUsers.find(u => u.email === credentials.email && credentials.password === '123456');
  if (user && credentials.companyId) {
    // Buscar la empresa seleccionada
    const company = COMPANIES.find(c => String(c.id) === String(credentials.companyId));
    const userWithCompany = {
      ...user,
      id: String(user.id),
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

