import { useEffect } from 'react';
import { useUserContext } from '../providers/UserProvider';
import {
  fetchUsersThunk,
  fetchUserByIdThunk,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
  activateUserThunk,
  deactivateUserThunk,
  applyFiltersThunk,
  clearFiltersThunk,
  clearUserStateThunk,
} from '../thunks/userThunks';
import type { CreateUserData, UpdateUserData, UserFilters } from '../types';

/**
 * Hook personalizado para manejar operaciones de usuarios
 * Combina el contexto con los thunks para una API limpia
 */
export function useUserActions(autoFetch: boolean = true) {
  const { state, dispatch } = useUserContext();

  // Auto-fetch usuarios al montar el componente si está habilitado
  useEffect(() => {
    if (autoFetch && state.users.length === 0 && !state.isLoading) {
      fetchUsersThunk(dispatch);
    }
  }, [autoFetch, dispatch, state.users.length, state.isLoading]);

  return {
    // Estado
    ...state,
    
    // Acciones para usuarios
    fetchUsers: (filters?: UserFilters) => fetchUsersThunk(dispatch, filters),
    fetchUserById: (userId: string) => fetchUserByIdThunk(dispatch, userId),
    createUser: (userData: CreateUserData) => createUserThunk(dispatch, userData),
    updateUser: (userId: string, userData: UpdateUserData) => 
      updateUserThunk(dispatch, userId, userData),
    deleteUser: (userId: string) => deleteUserThunk(dispatch, userId),
    activateUser: (userId: string) => activateUserThunk(dispatch, userId),
    deactivateUser: (userId: string) => deactivateUserThunk(dispatch, userId),
    
    // Acciones para filtros
    applyFilters: (filters: UserFilters) => applyFiltersThunk(dispatch, filters),
    clearFilters: () => clearFiltersThunk(dispatch),
    
    // Acciones para selección
    selectUser: (user: any) => dispatch({ type: 'SET_SELECTED_USER', payload: user }),
    clearSelection: () => dispatch({ type: 'SET_SELECTED_USER', payload: null }),
    
    // Utilidades
    clearState: () => clearUserStateThunk(dispatch),
    refetch: () => fetchUsersThunk(dispatch, state.filters),
  };
}
