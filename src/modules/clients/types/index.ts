// Tipo para crear cliente (sin id)
export type ClientCreateData = Omit<Client, 'id'>;

// Tipos base para el módulo de clientes reutilizable
export type ClientStatus = 'active' | 'inactive' | 'suspended';
export type ClientRiskLevel = 'low' | 'medium' | 'high';
export type ClientUserType = 'premium' | 'regular';

export interface Client {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  userType: ClientUserType;
  status: ClientStatus;
  riskLevel: ClientRiskLevel;
}

export interface ClientsPaginationMeta {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

export interface ClientsPaginatedResponse {
  data: Client[];
  meta: ClientsPaginationMeta;
}

export interface ClientFilters {
  search?: string;
  name?: string;
  email?: string;
  status?: string;
  riskLevel?: string;
  page?: number;
  per_page?: number;
}

export interface ClientsListState {
  clients: Client[];
  isLoading: boolean;
  error: null | { status: number; message: string };
  filters: ClientFilters;
  selectedClient: Client | null;
  pagination?: ClientsPaginationMeta;
}

export interface UseClientsListPageProps {
  perPage: number;
  searchTerm: string;
  selectedStatus: string;
  setSearchTerm: (v: string) => void;
  setSelectedStatus: (v: string) => void;
  setPerPage: (v: number) => void;
  onPerPageChange: (v: number) => void;
  onNewClient: () => void;
  onEditClient: (client: any) => void;
  onDeleteClient: (clientId: string) => void;
}