import { createAsyncThunk } from '@reduxjs/toolkit';
import { delegationsApi } from '../api/delegationsApi';
import type { Delegation, NewDelegation } from '../../types';


// Obtener todas las delegaciones
export const getDelegations = createAsyncThunk<
  Delegation[],
  void,
  { rejectValue: { status: number; message: string } }
>(
  'delegations/all',
  async (_, { rejectWithValue }) => {
    try {
      const data = await delegationsApi.all();
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || 'Error al cargar delegaciones',
        });
      }
      return rejectWithValue({
        status: 0,
        message: error.message || 'Error desconocido',
      });
    }
  }
);


// Crear delegación
export const createDelegation = createAsyncThunk<
  Delegation,
  NewDelegation,
  { rejectValue: { status: number; message: string } }
>(
  'delegations/create',
  async (data, { rejectWithValue }) => {
    try {
      const delegation = await delegationsApi.create(data);
      return delegation;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.error || 'Error al crear delegación',
        });
      }
      return rejectWithValue({
        status: 0,
        message: error.message || 'Error desconocido',
      });
    }
  }
);