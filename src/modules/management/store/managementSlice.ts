import { createSlice } from '@reduxjs/toolkit';
import type { ManagementState } from '../types/index';
import { fetchWalletBalance, fetchWalletTransactions } from '@/modules/wallet/store';

const initialState: ManagementState = {
  transactions: [],
  balances: [],
  cards: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWalletTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchWalletTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error al cargar transacciones';
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.balances = [action.payload];
      });
  },
});

export default walletSlice.reducer;
