import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ClientsListState, Client, ClientFilters, ClientsPaginatedResponse } from '../types';
import { fetchClients, addClient, updateClient, deleteClient } from './clientsThunks';

const initialState: ClientsListState = {
  clients: [],
  isLoading: false,
  error: null,
  filters: {},
  selectedClient: null,
  pagination: {
    page: 1,
    pages: 1,
    per_page: 10,
    total: 0,
  },
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ClientFilters>) {
      state.filters = action.payload;
    },
    setSelectedClient(state, action: PayloadAction<Client | null>) {
      state.selectedClient = action.payload;
    },
    setPagination(state, action: PayloadAction<{ page: number; per_page: number }>) {
      if (state.pagination) {
        state.pagination.page = action.payload.page;
        state.pagination.per_page = action.payload.per_page;
      }
    },
    resetClientsState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action: PayloadAction<ClientsPaginatedResponse>) => {
        state.isLoading = false;
        state.clients = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ClientsListState['error'];
      })
      .addCase(addClient.fulfilled, (state, action: PayloadAction<Client>) => {
        state.clients.unshift(action.payload);
        if (state.pagination) state.pagination.total += 1;
      })
      .addCase(updateClient.fulfilled, (state, action: PayloadAction<Client>) => {
        const idx = state.clients.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.clients[idx] = action.payload;
      })
      .addCase(deleteClient.fulfilled, (state, action: PayloadAction<string>) => {
        state.clients = state.clients.filter((c) => c.id !== action.payload);
        if (state.pagination) state.pagination.total -= 1;
      });
  },
});

export const { setFilters, setSelectedClient, setPagination, resetClientsState } = clientsSlice.actions;
export default clientsSlice.reducer;
