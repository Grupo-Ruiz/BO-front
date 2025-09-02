import { createAsyncThunk } from '@reduxjs/toolkit';
import { walletApi } from '../api/walletApi';
import type { WalletTransactionFilters, CreateWalletTransactionData } from '../../types/index';

export const fetchWalletTransactions = createAsyncThunk(
  'wallet/fetchWalletTransactions',
  async (args: { filters?: WalletTransactionFilters } = {}, { rejectWithValue }) => {
    try {
      return await walletApi.getTransactions(args.filters);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar transacciones');
    }
  }
);

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchWalletBalance',
  async (clientId: string, { rejectWithValue }) => {
    try {
      return await walletApi.getBalance(clientId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar balance');
    }
  }
);

export const createWalletTransaction = createAsyncThunk(
  'wallet/createWalletTransaction',
  async (data: CreateWalletTransactionData, { rejectWithValue }) => {
    try {
      return await walletApi.createTransaction(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear transacción');
    }
  }
);
