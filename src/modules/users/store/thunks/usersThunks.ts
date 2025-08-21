import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserFilters } from '../../types';
import { usersApi } from '../usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args: { filters?: UserFilters } = {}, { rejectWithValue }) => {
    try {
      // Usar getPaginated para obtener { data, meta }
      const data = await usersApi.getPaginated(args.filters || {});
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar usuarios');
    }
  }
);
