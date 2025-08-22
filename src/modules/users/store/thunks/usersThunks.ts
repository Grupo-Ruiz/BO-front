import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../api/usersApi';
import type { CreateUserData, UserFilters } from '../../types';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (args: { filters?: UserFilters } = {}, { rejectWithValue }) => {
    try {
      const data = await usersApi.getPaginated(args.filters || {});
      return data;
    } catch (error: any) {
      // Si error.response existe, es un error HTTP
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.message || 'Error al cargar usuarios',
        });
      }
      // Otro tipo de error (red, etc)
      return rejectWithValue({
        status: 0,
        message: error.message || 'Error desconocido',
      });
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserData, { rejectWithValue }) => {
    try {
      const data = await usersApi.create(userData);
      return data;
    } catch (error: any) {
      // Si error.response existe, es un error HTTP
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.msg || 'Error al crear el usuario',
        });
      }
      // Otro tipo de error (red, etc)
      return rejectWithValue({
        status: 0,
        message: error.message || 'Error desconocido',
      });
    }
  }
);