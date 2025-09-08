import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientsApi } from './clientsApi';
import type { Client, ClientsPaginatedResponse, ClientFilters } from '../types';

export const fetchClients = createAsyncThunk<ClientsPaginatedResponse, { filters?: ClientFilters } | void>(
  'clients/fetchClients',
  async (args, { rejectWithValue }) => {
    try {
      const data = await clientsApi.getPaginated(args && args.filters ? args.filters : {});
      return data;
    } catch (error: any) {
      return rejectWithValue({ status: 0, message: error.message || 'Error al cargar clientes' });
    }
  }
);

export const addClient = createAsyncThunk<Client, Client>(
  'clients/addClient',
  async (client, { rejectWithValue }) => {
    try {
      return await clientsApi.create(client);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al agregar cliente');
    }
  }
);

export const updateClient = createAsyncThunk<Client, Client>(
  'clients/updateClient',
  async (client, { rejectWithValue }) => {
    try {
      return await clientsApi.update(client.id, client);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al actualizar cliente');
    }
  }
);

export const deleteClient = createAsyncThunk<string, string>(
  'clients/deleteClient',
  async (id, { rejectWithValue }) => {
    try {
      await clientsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al eliminar cliente');
    }
  }
);