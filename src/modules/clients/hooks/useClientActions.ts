import { useEffect } from 'react';
import { useClientContext } from '../providers/ClientProvider';
import {
  fetchClientsThunk,
  fetchClientByIdThunk,
  createClientThunk,
  updateClientThunk,
  suspendClientThunk,
  activateClientThunk,
  applyFiltersThunk,
  clearFiltersThunk,
  clearClientStateThunk,
} from '../thunks/clientThunks';
import type { CreateClientData, UpdateClientData, ClientFilters } from '../types';

/**
 * Hook personalizado para manejar operaciones de clientes
 * Combina el contexto con los thunks para una API limpia
 */
export function useClientActions(autoFetch: boolean = true) {
  const { state, dispatch } = useClientContext();

  // Auto-fetch clientes al montar el componente si está habilitado
  useEffect(() => {
    if (autoFetch && state.clients.length === 0 && !state.isLoading) {
      fetchClientsThunk(dispatch);
    }
  }, [autoFetch, dispatch, state.clients.length, state.isLoading]);

  return {
    // Estado
    ...state,
    
    // Acciones para clientes
    fetchClients: (filters?: ClientFilters) => fetchClientsThunk(dispatch, filters),
    fetchClientById: (clientId: string) => fetchClientByIdThunk(dispatch, clientId),
    createClient: (clientData: CreateClientData) => createClientThunk(dispatch, clientData),
    updateClient: (clientId: string, clientData: UpdateClientData) => 
      updateClientThunk(dispatch, clientId, clientData),
    suspendClient: (clientId: string) => suspendClientThunk(dispatch, clientId),
    activateClient: (clientId: string) => activateClientThunk(dispatch, clientId),
    
    // Acciones para filtros
    applyFilters: (filters: ClientFilters) => applyFiltersThunk(dispatch, filters),
    clearFilters: () => clearFiltersThunk(dispatch),
    
    // Acciones para selección
    selectClient: (client: any) => dispatch({ type: 'SET_SELECTED_CLIENT', payload: client }),
    clearSelection: () => dispatch({ type: 'SET_SELECTED_CLIENT', payload: null }),
    
    // Utilidades
    clearState: () => clearClientStateThunk(dispatch),
    refetch: () => fetchClientsThunk(dispatch, state.filters),
  };
}
