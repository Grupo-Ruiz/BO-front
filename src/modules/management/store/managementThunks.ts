import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CreateTransactionData, TransactionFilters, Transaction } from '../types';
import { getAllTransactions, getBalance, createTransaction as createTransactionService } from '../services/ManagementService';

export const fetchTransactions = createAsyncThunk(
  'management/fetchTransactions',
  async (args: { filters?: TransactionFilters } = {}, { rejectWithValue }) => {
    try {
      return await getAllTransactions(args.filters);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar transacciones');
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'management/fetchBalance',
  async (clientId: string, { rejectWithValue }) => {
    try {
      return await getBalance(clientId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar balance');
    }
  }
);

export const createTransaction = createAsyncThunk<Transaction,CreateTransactionData, { rejectValue: string } >(
  'management/createTransaction',
  async (data: CreateTransactionData, { rejectWithValue }) => {
    try {
      return await createTransactionService(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al crear transacción');
    }
  }
);