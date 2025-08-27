import { createSlice } from '@reduxjs/toolkit';
import type { UsersListState } from '../../types';
import { fetchUsers } from '../thunks/usersThunks';

const initialState: UsersListState = {
  users: [],
  isLoading: false,
  error: null,
  filters: {},
  selectedUser: null,
  pagination: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      //Funciones para gestionar el listado de usuarios
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.meta;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as { status: number; message: string };
      })
  }
});

export const { setFilters, setSelectedUser, clearState } = usersSlice.actions;
export default usersSlice.reducer;