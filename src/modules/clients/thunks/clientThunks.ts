import type { CreateClientData, UpdateClientData, ClientFilters, Client } from '../types';
import { ClientService } from '../services/ClientService';

// Definimos las acciones del cliente de manera explícita
type ClientAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'REMOVE_CLIENT'; payload: string }
  | { type: 'SET_FILTERS'; payload: ClientFilters }
  | { type: 'SET_SELECTED_CLIENT'; payload: Client | null }
  | { type: 'CLEAR_STATE' };

// Tipo para el dispatch del contexto
type ClientDispatch = React.Dispatch<ClientAction>;

/**
 * Thunk para obtener todos los clientes con filtros opcionales
 */
export const fetchClientsThunk = async (
  dispatch: ClientDispatch,
  filters?: ClientFilters
) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const clients = await ClientService.getClients(filters);
    dispatch({ type: 'SET_CLIENTS', payload: clients });
    
    if (filters) {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar clientes';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  }
};

/**
 * Thunk para obtener un cliente específico por ID
 */
export const fetchClientByIdThunk = async (
  dispatch: ClientDispatch,
  clientId: string
) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const client = await ClientService.getClientById(clientId);
    if (client) {
      dispatch({ type: 'SET_SELECTED_CLIENT', payload: client });
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Cliente no encontrado' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar cliente';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  }
};

/**
 * Thunk para crear un nuevo cliente
 */
export const createClientThunk = async (
  dispatch: ClientDispatch,
  clientData: CreateClientData
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const newClient = await ClientService.createClient(clientData);
    dispatch({ type: 'ADD_CLIENT', payload: newClient });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al crear cliente';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para actualizar un cliente existente
 */
export const updateClientThunk = async (
  dispatch: ClientDispatch,
  clientId: string,
  clientData: UpdateClientData
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedClient = await ClientService.updateClient(clientId, clientData);
    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar cliente';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para suspender un cliente
 */
export const suspendClientThunk = async (
  dispatch: ClientDispatch,
  clientId: string
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedClient = await ClientService.suspendClient(clientId);
    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al suspender cliente';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para activar un cliente
 */
export const activateClientThunk = async (
  dispatch: ClientDispatch,
  clientId: string
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedClient = await ClientService.activateClient(clientId);
    dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al activar cliente';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para aplicar filtros a la lista de clientes
 */
export const applyFiltersThunk = async (
  dispatch: ClientDispatch,
  filters: ClientFilters
) => {
  dispatch({ type: 'SET_FILTERS', payload: filters });
  await fetchClientsThunk(dispatch, filters);
};

/**
 * Thunk para limpiar filtros
 */
export const clearFiltersThunk = async (dispatch: ClientDispatch) => {
  const emptyFilters = {};
  dispatch({ type: 'SET_FILTERS', payload: emptyFilters });
  await fetchClientsThunk(dispatch, emptyFilters);
};

/**
 * Thunk para limpiar el estado completo
 */
export const clearClientStateThunk = (dispatch: ClientDispatch) => {
  dispatch({ type: 'CLEAR_STATE' });
};
