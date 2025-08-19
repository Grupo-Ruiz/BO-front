import { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import type { User, UserFilters, CreateUserData, UpdateUserData } from '../types';

export function useUsersApi(initialFilters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (filters: UserFilters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await UserService.getUsers(filters);
      setUsers(users);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: CreateUserData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await UserService.createUser(userData);
      setUsers(prev => [newUser, ...prev]);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, userData: UpdateUserData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await UserService.updateUser(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al actualizar usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await UserService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialFilters) {
      fetchUsers(initialFilters);
    } else {
      fetchUsers();
    }
  }, []);

  return {
    isLoading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}