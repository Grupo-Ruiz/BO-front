import { createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from '../../types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: { payload: AuthUser | null }) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
