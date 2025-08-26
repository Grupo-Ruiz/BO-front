
// Usuario autenticado para AuthContext y servicios de auth
export interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  telefono?: string;
  delegacion_id: number;
}
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

export interface LoginCredentials {
  email: string;
  password: string;
  delegacion_id: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}