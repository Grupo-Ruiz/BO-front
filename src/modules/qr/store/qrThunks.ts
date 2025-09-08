import { createAsyncThunk } from '@reduxjs/toolkit';
import { qrApi } from './qrApi';
import type { QrData } from '../types';

export const getQR = createAsyncThunk<QrData>(
  'qr/getQR',
  async (_, { rejectWithValue }) => {
    try {
      return await qrApi.getQR();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error obteniendo QR');
    }
  }
);