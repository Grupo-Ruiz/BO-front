
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/shared/store/hooks';
import {
  fetchClients,
  addClient,
  updateClient,
  deleteClient,
} from '../store/clientsThunks';
import {
  setFilters,
  setSelectedClient,
  setPagination,
  resetClientsState,
} from '../store/clientsSlice';
import type { Client, ClientFilters } from '../types';

export const useClientsList = () => {
  const dispatch = useAppDispatch();
  const {
    clients,
    isLoading,
    error,
    filters,
    selectedClient,
    pagination,
  } = useAppSelector((state) => state.clients);

  const loadClients = useCallback((filters?: ClientFilters) => {
    dispatch(fetchClients({ filters }));
  }, [dispatch]);

  const onAddClient = useCallback((client: Client) => {
    dispatch(addClient(client));
  }, [dispatch]);

  const onUpdateClient = useCallback((client: Client) => {
    dispatch(updateClient(client));
  }, [dispatch]);

  const onDeleteClient = useCallback((id: string) => {
    dispatch(deleteClient(id));
  }, [dispatch]);

  const onSetFilters = useCallback((filters: ClientFilters) => {
    dispatch(setFilters(filters));
  }, [dispatch]);

  const onSetSelectedClient = useCallback((client: Client | null) => {
    dispatch(setSelectedClient(client));
  }, [dispatch]);

  const onSetPagination = useCallback((page: number, per_page: number) => {
    dispatch(setPagination({ page, per_page }));
  }, [dispatch]);

  const onResetState = useCallback(() => {
    dispatch(resetClientsState());
  }, [dispatch]);

  return {
    clients,
    isLoading,
    error,
    filters,
    selectedClient,
    pagination,
    loadClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    onSetFilters,
    onSetSelectedClient,
    onSetPagination,
    onResetState,
  };
};
