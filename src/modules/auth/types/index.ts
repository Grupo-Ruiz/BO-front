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
import type { Company } from '@/modules/shared/data/companies';

export interface UseLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  initialValues?: LoginCredentials;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  isLoading?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
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
