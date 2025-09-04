// Tipos base para el módulo de clientes reutilizable

export type ClientStatus = 'active' | 'inactive' | 'suspended';
export type ClientKycStatus = 'verified' | 'pending' | 'rejected';
export type ClientRiskLevel = 'low' | 'medium' | 'high';
export type ClientUserType = 'premium' | 'regular';

export interface Client {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  userType: ClientUserType;
  status: ClientStatus;
  kycStatus: ClientKycStatus;
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
  kycStatus?: string;
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
