import type { CardInfo } from "@/modules/cards/types";
import type { QrData } from "@/modules/qr/types";

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';
  amount: number;
  currency: 'EUR' | 'USD';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  reference: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
  updatedAt: string;
  processedAt: string;
  relatedTransactionId?: string;
  metadata?: Record<string, any>;
}

export interface TransactionFilters {
  search?: string;
  type?: Transaction['type'];
  status?: Transaction['status'];
  currency?: Transaction['currency'];
  clientId?: string;
  minAmount?: number;
  maxAmount?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  per_page?: number;
}

export interface ManagementBalance {
  clientId: string;
  currency: 'EUR' | 'USD';
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  lastUpdated: string;
}

export interface CreateTransactionData {
  clientId: string;
  type: Transaction['type'];
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

export interface ManagementStats {
  totalTransactions: number;
  totalVolume: number;
  transactionsByType: Record<string, number>;
  transactionsByStatus: Record<string, number>;
  averageTransaction: number;
  totalDeposits: number;
  totalWithdrawals: number;
  netFlow: number;
}

export interface ManagementState {
  transactions: Transaction[];
  balances: ManagementBalance[];
  cards: CardInfo[];
  qr?: QrData;
  isLoading: boolean;
  error?: string | null;
}