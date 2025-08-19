// Tipos para el módulo de operaciones
export interface Operation {
  id: string;
  type: 'recharge' | 'payment' | 'transfer' | 'withdrawal';
  amount: number;
  currency: 'EUR' | 'USD';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  clientId: string;
  clientName?: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface CreateOperationData {
  type: 'recharge' | 'payment' | 'transfer' | 'withdrawal';
  amount: number;
  currency: 'EUR' | 'USD';
  description: string;
  clientId: string;
  metadata?: Record<string, any>;
}

export interface UpdateOperationData {
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface OperationFilters {
  search?: string;
  type?: 'recharge' | 'payment' | 'transfer' | 'withdrawal';
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  currency?: 'EUR' | 'USD';
  clientId?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  per_page?: number;
}

export interface OperationStats {
  totalOperations: number;
  totalAmount: number;
  operationsByType: Record<string, number>;
  operationsByStatus: Record<string, number>;
  averageAmount: number;
}
