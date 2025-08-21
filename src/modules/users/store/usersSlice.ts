import { createSlice } from '@reduxjs/toolkit';
import type { UsersListState } from '../types';
import { fetchUsers } from './thunks/usersThunks';

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
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data || [];
        state.pagination = action.payload.meta || [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setSelectedUser, clearState } = usersSlice.actions;
export { fetchUsers } from './thunks/usersThunks';
export default usersSlice.reducer;