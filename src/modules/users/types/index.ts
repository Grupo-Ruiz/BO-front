// =====================
// Custom hook props
// =====================

export interface UseUserFormProps {
  user?: User | null;
  mode: 'create' | 'edit';
  delegationId?: number;
}

// =====================
// User entity & API types
// =====================

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

export interface UserFormData {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password?: string;
  confirmPassword?: string;
  delegacion_id?: number;
  activo?: boolean;
}

export type UserEditFormData = Omit<UserFormData, 'confirmPassword'>;

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

// =====================
// Modal & UI logic types
// =====================

export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (formData: UserFormData) => Promise<void> | void;
  onEdit?: (formData: UserFormData, userId: number) => Promise<void> | void;
  user?: User | null;
  mode: 'create' | 'edit' | 'view';
}

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

// =====================
// State, error, filters & pagination
// =====================

export interface UsersListError {
  status: number;
  message: string;
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

export interface UsersPaginationMeta {
  include_deleted: boolean;
  only_active: boolean;
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

export interface UsersPaginatedResponse {
  data: User[];
  meta: UsersPaginationMeta;
}

export interface UsersListState {
  users: User[];
  isLoading: boolean;
  error: UsersListError | null;
  filters: UserFilters;
  selectedUser: User | null;
  pagination?: UsersPaginationMeta;
}

// =====================
// Component props types (Table, Pagination, Filters)
// =====================

export interface TableProps {
  users: User[];
  isLoading: boolean;
  error: UsersListError | null;
  orderBy: string;
  orderDir: string;
  handleSort: (field: string) => void;
  includeDeleted: boolean;
  formatDate: (date: string) => string;
  getStatusBadge: (activo: boolean) => { className: string; text: string };
  handleEditUser: (user: User) => void;
  handleDeleteUser: (id: number) => void;
  handleRestoreUser: (id: number) => void;
}

export interface PaginationProps {
  pagination?: UsersPaginationMeta;
  page: number;
  setPage: (v: number) => void;
}

export interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  perPage: number;
  setPerPage: (v: number) => void;
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  includeDeleted: boolean;
  setIncludeDeleted: (v: boolean) => void;
  onSearch: (e: React.FormEvent) => void;
  onClear: () => void;
}