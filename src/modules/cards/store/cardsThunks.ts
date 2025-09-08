import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardsApi } from './cardsApi';
import type { CardInfo } from '../types';

export const fetchCards = createAsyncThunk<CardInfo[]>(
  'cards/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      return await cardsApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar tarjetas');
    }
  }
);