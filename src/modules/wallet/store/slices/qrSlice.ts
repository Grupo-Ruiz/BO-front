import { createSlice } from '@reduxjs/toolkit';
import type { WalletQR } from '../../types/index';
import { getWalletQR } from '../thunks/qrThunks';

export interface QRState {
  data: WalletQR | null;
  loading: boolean;
  error: string | null;
}

const initialState: QRState = {
  data: null,
  loading: false,
  error: null,
};

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    clearQR: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
  .addCase(getWalletQR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(getWalletQR.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  .addCase(getWalletQR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQR } = qrSlice.actions;
export default qrSlice.reducer;
