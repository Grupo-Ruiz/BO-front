import { createTransaction, getAllBalances, getAllTransactions, getBalance, getTransactionById } from '../services/ManagementService';
import type { CreateTransactionData, ManagementBalance, Transaction, TransactionFilters } from '../types';

export const managementApi = {
  getTransactions: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    return getAllTransactions(filters);
  },
  getTransactionById: async (id: string): Promise<Transaction> => {
    return getTransactionById(id);
  },
  createTransaction: async (data: CreateTransactionData): Promise<Transaction> => {
    return createTransaction(data);
  },
  getBalance: async (clientId: string, currency: 'EUR' | 'USD' = 'EUR'): Promise<ManagementBalance> => {
    return getBalance(clientId, currency);
  },
  getAllBalances: async (): Promise<ManagementBalance[]> => {
    return getAllBalances();
  },
};