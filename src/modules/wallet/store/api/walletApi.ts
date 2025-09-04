import * as WalletService from '../../services/WalletService';
import type { WalletTransaction, WalletTransactionFilters, WalletBalance, CreateWalletTransactionData } from '../../types/index';

export const walletApi = {
  getTransactions: async (filters?: WalletTransactionFilters): Promise<WalletTransaction[]> => {
    return WalletService.getAllWalletTransactions(filters);
  },
  getTransactionById: async (id: string): Promise<WalletTransaction> => {
    return WalletService.getWalletTransactionById(id);
  },
  createTransaction: async (data: CreateWalletTransactionData): Promise<WalletTransaction> => {
    return WalletService.createWalletTransaction(data);
  },
  getBalance: async (clientId: string, currency: 'EUR' | 'USD' = 'EUR'): Promise<WalletBalance> => {
    return WalletService.getWalletBalance(clientId, currency);
  },
  getAllBalances: async (): Promise<WalletBalance[]> => {
    return WalletService.getAllWalletBalances();
  },
};