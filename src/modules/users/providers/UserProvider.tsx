import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User, UserFilters } from '../types';

// Estado del contexto de usuarios
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  selectedUser: User | null;
}

// Acciones disponibles
type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: string }
  | { type: 'SET_FILTERS'; payload: UserFilters }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'CLEAR_STATE' };

// Estado inicial
const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  filters: {},
  selectedUser: null,
};

// Reducer para manejar las acciones
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_USERS':
      return { ...state, users: action.payload, isLoading: false, error: null };
    
    case 'ADD_USER':
      return { 
        ...state, 
        users: [action.payload, ...state.users], 
        isLoading: false, 
        error: null 
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        selectedUser: state.selectedUser?.id === action.payload.id ? action.payload : state.selectedUser,
        isLoading: false,
        error: null
      };
    
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        selectedUser: state.selectedUser?.id === action.payload ? null : state.selectedUser,
        isLoading: false,
        error: null
      };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    
    case 'CLEAR_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Contexto
const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado dentro de un UserProvider');
  }
  return context;
}
