import { createAsyncThunk } from '@reduxjs/toolkit';
import type { WalletQR } from '../../types/index';
import { qrApi } from '../api/qrApi';

export const getWalletQR = createAsyncThunk<WalletQR, Record<string, any> | undefined>(
  'qr/getWalletQR',
  async (params, { rejectWithValue }) => {
    try {
      return await qrApi.getWalletQR(params);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error obteniendo QR');
    }
  }
);

export const getWalletQRThunk = (params?: Record<string, any>) => (dispatch: any) => {
  return dispatch(getWalletQR(params));
};
