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
 * Tipos de respuesta estándar de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
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
