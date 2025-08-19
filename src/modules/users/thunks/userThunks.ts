import type { CreateUserData, UpdateUserData, UserFilters, User } from '../types';
import { UserService } from '../services/UserService';

// Definimos las acciones del usuario de manera explícita
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

// Tipo para el dispatch del contexto
type UserDispatch = React.Dispatch<UserAction>;

/**
 * Thunk para obtener todos los usuarios con filtros opcionales
 */
export const fetchUsersThunk = async (
  dispatch: UserDispatch,
  filters?: UserFilters
) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const users = await UserService.getUsers(filters);
    dispatch({ type: 'SET_USERS', payload: users });
    
    if (filters) {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar usuarios';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  }
};

/**
 * Thunk para obtener un usuario específico por ID
 */
export const fetchUserByIdThunk = async (
  dispatch: UserDispatch,
  userId: string
) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const user = await UserService.getUserById(userId);
    if (user) {
      dispatch({ type: 'SET_SELECTED_USER', payload: user });
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Usuario no encontrado' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  }
};

/**
 * Thunk para crear un nuevo usuario
 */
export const createUserThunk = async (
  dispatch: UserDispatch,
  userData: CreateUserData
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const newUser = await UserService.createUser(userData);
    dispatch({ type: 'ADD_USER', payload: newUser });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al crear usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para actualizar un usuario existente
 */
export const updateUserThunk = async (
  dispatch: UserDispatch,
  userId: string,
  userData: UpdateUserData
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedUser = await UserService.updateUser(userId, userData);
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para eliminar un usuario
 */
export const deleteUserThunk = async (
  dispatch: UserDispatch,
  userId: string
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    await UserService.deleteUser(userId);
    dispatch({ type: 'REMOVE_USER', payload: userId });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para activar un usuario
 */
export const activateUserThunk = async (
  dispatch: UserDispatch,
  userId: string
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedUser = await UserService.activateUser(userId);
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al activar usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para desactivar un usuario
 */
export const deactivateUserThunk = async (
  dispatch: UserDispatch,
  userId: string
): Promise<boolean> => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({ type: 'SET_ERROR', payload: null });

  try {
    const updatedUser = await UserService.deactivateUser(userId);
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al desactivar usuario';
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
    return false;
  }
};

/**
 * Thunk para aplicar filtros a la lista de usuarios
 */
export const applyFiltersThunk = async (
  dispatch: UserDispatch,
  filters: UserFilters
) => {
  dispatch({ type: 'SET_FILTERS', payload: filters });
  await fetchUsersThunk(dispatch, filters);
};

/**
 * Thunk para limpiar filtros
 */
export const clearFiltersThunk = async (dispatch: UserDispatch) => {
  const emptyFilters = {};
  dispatch({ type: 'SET_FILTERS', payload: emptyFilters });
  await fetchUsersThunk(dispatch, emptyFilters);
};

/**
 * Thunk para limpiar el estado completo
 */
export const clearUserStateThunk = (dispatch: UserDispatch) => {
  dispatch({ type: 'CLEAR_STATE' });
};
