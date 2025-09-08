import { createSlice } from '@reduxjs/toolkit';
import type { ManagementState } from '../types/index';
import { fetchBalance, fetchTransactions } from './managementThunks';

const initialState: ManagementState = {
  transactions: [],
  balances: [],
  cards: [],
  isLoading: false,
  error: null,
};

const managementSlice = createSlice({
  name: 'management',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar transacciones';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balances = [action.payload];
      });
  },
});

export default managementSlice.reducer;
