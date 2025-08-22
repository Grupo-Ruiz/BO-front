import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginWithApi, logoutWithApi } from '../../services/authService';
import type { LoginCredentials } from '../../types';
import type { AuthUser } from '../../types';

export const loginThunk = createAsyncThunk<
  AuthUser & { token: string },
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  const response = await loginWithApi(credentials);
  if (response.success && response.data) {
    return response.data;
  } else {
    return rejectWithValue(response.error || 'Error de login');
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutWithApi();
});
