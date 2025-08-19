// Estructura de datos de la API de Recaudadora
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role_id: number;
  sede_id?: number;
  created_at: string;
  updated_at: string;
  role?: {
    id: number;
    nombre: string;
    created_at: string;
    updated_at: string;
  };
  headquarter?: {
    id: number;
    nombre: string;
    direccion: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ApiRole {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface ApiHeadquarter {
  id: number;
  nombre: string;
  direccion: string;
  created_at: string;
  updated_at: string;
}

// Usuarios del backoffice - Empleados de la empresa (formato interno)
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'operator';
  roleId: number;
  roleName?: string;
  status: 'active' | 'inactive';
  sedeId?: number;
  sedeName?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  companyId?: string;
  company?: any;
  companies?: any[];
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role_id: number;
  sede_id?: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role_id?: number;
  sede_id?: number;
}

export interface UserFilters {
  search?: string;
  name?: string;
  email?: string;
  role?: number;
  sede?: number;
  date?: string;
  column?: string;
  order?: 'asc' | 'desc';
  pagination?: number;
}

export interface UsersResponse {
  success: boolean;
  data: ApiUser[];
  message: string;
}

export interface UsersPaginatedResponse {
  current_page: number;
  data: ApiUser[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
