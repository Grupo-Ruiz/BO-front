// Tipos para el UserModal y su lógica
export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (formData: UserFormData) => Promise<void> | void; // Solo para crear
  onEdit?: (formData: UserFormData, userId: number) => Promise<void> | void; // Solo para editar
  user?: User | null;
  mode: 'create' | 'edit' | 'view';
}

// Solo los campos editables en el formulario
// Para crear usuario
export interface UserFormData {
  id?: number; // Solo para edición
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password?: string;
  confirmPassword?: string;
  delegacion_id?: number; // Solo para crear/editar, no se muestra en el modal de vista
  activo?: boolean; // Solo para crear/editar, no se muestra en el modal de vista
}

// Para editar usuario (sin confirmPassword)
export type UserEditFormData = Omit<UserFormData, 'confirmPassword'>;

export interface UseUserModalLogic {
  mode: UserModalProps['mode'];
  formData: UserFormData;
  errors: Record<string, string>;
  loading: boolean;
  handleChange: (field: keyof UserFormData) => (value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onClose: () => void;
  user?: User | null;
  isOpen: boolean;
}

// Tipado global de usuario para toda la app (coincide con la API)
export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  telefono: string;
  activo: boolean;
  delegacion_id?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Tipos para la API de usuarios
export interface CreateUserData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password?: string;
  delegacion_id?: number;
  activo?: boolean;
}

export interface UpdateUserData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password?: string;
  activo?: boolean;
  delegacion_id?: number;
}

// Listado de usuarios con paginación
export interface UsersListError {
  status: number;
  message: string;
}

export interface UsersListState {
  users: any[];
  isLoading: boolean;
  error: UsersListError | null;
  filters: UserFilters;
  selectedUser: any | null;
  pagination?: UsersPaginationMeta;
}

export interface UserFilters {
  search?: string;
  name?: string;
  email?: string;
  sede?: number;
  date?: string;
  column?: string;
  order?: 'asc' | 'desc';
  pagination?: number;
}

// Meta de paginación para la respuesta paginada
export interface UsersPaginationMeta {
  include_deleted: boolean;
  only_active: boolean;
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

// Respuesta paginada de usuarios
export interface UsersPaginatedResponse {
  data: User[];
  meta: UsersPaginationMeta;
}