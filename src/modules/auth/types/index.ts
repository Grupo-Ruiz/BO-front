export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
import type { Company } from '../../../shared/data/companies.ts';

export interface UseLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  initialValues?: LoginCredentials;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}
export interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  role?: 'admin' | 'operator';
  fallback?: React.ReactNode;
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  isLoading?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator';
  permissions: string[];
  companyId: string;
  company?: Company;
}

export interface LoginCredentials {
  email: string;
  password: string;
  companyId: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
