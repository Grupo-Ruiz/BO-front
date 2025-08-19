// Tipos para el módulo de wallet
export interface WalletTransaction {
  id: string;
  clientId: string;
  clientName?: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';
  amount: number;
  currency: 'EUR' | 'USD';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference: string;
  balanceBefore: number;
  balanceAfter: number;
  relatedTransactionId?: string; // Para transferencias y pagos relacionados
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  metadata?: Record<string, any>;
}

export interface WalletBalance {
  clientId: string;
  currency: 'EUR' | 'USD';
  balance: number;
  availableBalance: number; // Balance - fondos en retención
  pendingBalance: number;   // Fondos en retención/pendientes
  lastUpdated: string;
}

export interface CreateWalletTransactionData {
  clientId: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';
  amount: number;
  currency: 'EUR' | 'USD';
  description: string;
  relatedTransactionId?: string;
  metadata?: Record<string, any>;
}

export interface TransferData {
  fromClientId: string;
  toClientId: string;
  amount: number;
  currency: 'EUR' | 'USD';
  description: string;
  metadata?: Record<string, any>;
}

export interface WalletTransactionFilters {
  search?: string;
  type?: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';
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

export interface WalletStats {
  totalTransactions: number;
  totalVolume: number;
  transactionsByType: Record<string, number>;
  transactionsByStatus: Record<string, number>;
  averageTransaction: number;
  totalDeposits: number;
  totalWithdrawals: number;
  netFlow: number;
}
