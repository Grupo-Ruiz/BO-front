import { createSlice } from '@reduxjs/toolkit';
import { getQR } from './qrThunks';
import type { QrData } from '../types';

export interface QRState {
  data: QrData | null;
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
  .addCase(getQR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(getQR.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  .addCase(getQR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQR } = qrSlice.actions;
export default qrSlice.reducer;