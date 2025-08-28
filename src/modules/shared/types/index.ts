// Delegation types for API
export interface Delegation {
  id: number;
  nombre: string;
}

export interface NewDelegation {
  nombre: string;
}
/**
 * Interface genérica para servicios CRUD
 */
export interface CrudService<T, CreateData, UpdateData, Filters = any> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(data: CreateData): Promise<T>;
  update(id: string, data: UpdateData): Promise<T>;
  delete(id: string): Promise<boolean | void>;
  search?(filters: Filters): Promise<T[]>;
}

/**
 * Interface para servicios con paginación
 */
export interface PaginatedService<T, Filters = any> {
  getPaginated(filters?: Filters): Promise<{
    data: T[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
  }>;
}

/**
 * Filtros comunes para búsquedas
 */
export interface BaseFilters {
  search?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Tipos globales compartidos para toda la app
export interface KPI {
  id: string;
  name: string;
  value: number;
  description?: string;
  changeType?: 'increase' | 'decrease';
  change?: number;
  period?: string;
  previousValue?: number;
  // Para mocks
  userType?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  category?: string;
}

export interface WalletOperation {
  id: string;
  type: string;
  amount: number;
  date: string;
  userId?: string;
  timestamp?: string;
  userName?: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: string;
  userId?: string;
  reference?: string;
  method?: string;
  userName?: string;
}

export interface Operation {
  id: string;
  description: string;
  date: string;
  status: string;
  userId?: string;
  userName?: string;
}

export interface SAEOperation {
  id: string;
  operationType: string;
  date: string;
  details?: string;
  userId?: string;
  type?: string;
  description?: string;
  userName?: string;
  timestamp?: string;
  amount?: number;
  status?: string;
  saeReference?: string;
}

// Tipos compartidos para componentes
export interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}