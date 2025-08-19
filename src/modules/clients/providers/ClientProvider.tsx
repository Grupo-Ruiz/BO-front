import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Client, ClientFilters } from '../types';

// Estado del contexto de clientes
interface ClientState {
  clients: Client[];
  isLoading: boolean;
  error: string | null;
  filters: ClientFilters;
  selectedClient: Client | null;
}

// Acciones disponibles
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

// Estado inicial
const initialState: ClientState = {
  clients: [],
  isLoading: false,
  error: null,
  filters: {},
  selectedClient: null,
};

// Reducer
function clientReducer(state: ClientState, action: ClientAction): ClientState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload, isLoading: false, error: null };
    
    case 'ADD_CLIENT':
      return { 
        ...state, 
        clients: [action.payload, ...state.clients], 
        isLoading: false, 
        error: null 
      };
    
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client => 
          client.id === action.payload.id ? action.payload : client
        ),
        selectedClient: state.selectedClient?.id === action.payload.id ? action.payload : state.selectedClient,
        isLoading: false,
        error: null
      };
    
    case 'REMOVE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
        selectedClient: state.selectedClient?.id === action.payload ? null : state.selectedClient,
        isLoading: false,
        error: null
      };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_SELECTED_CLIENT':
      return { ...state, selectedClient: action.payload };
    
    case 'CLEAR_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Contexto
const ClientContext = createContext<{
  state: ClientState;
  dispatch: React.Dispatch<ClientAction>;
} | null>(null);

// Provider component
interface ClientProviderProps {
  children: ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  const [state, dispatch] = useReducer(clientReducer, initialState);

  return (
    <ClientContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientContext.Provider>
  );
}

// Hook para usar el contexto
export function useClientContext() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext debe ser usado dentro de un ClientProvider');
  }
  return context;
}
