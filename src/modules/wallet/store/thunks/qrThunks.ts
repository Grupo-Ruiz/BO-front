import { createAsyncThunk } from '@reduxjs/toolkit';
import type { WalletQR } from '../../types/index';
import { qrApi } from '../api/qrApi';

export const getWalletQR = createAsyncThunk<WalletQR>(
  'qr/getWalletQR',
  async (_, { rejectWithValue }) => {
    try {
      return await qrApi.getWalletQR();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error obteniendo QR');
    }
  }
);