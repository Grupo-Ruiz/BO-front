import { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import type { 
  User, 
  UserFilters, 
  CreateUserData, 
  UpdateUserData
} from '../types';
export function useUsers(initialFilters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>(initialFilters || {});

  const fetchUsers = async (newFilters?: UserFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filtersToUse = newFilters || filters;
      const data = await UserService.getUsers(filtersToUse);
      const usersResult = await UserService.getUsers(filtersToUse);
      setUsers(usersResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: CreateUserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newUser = await UserService.createUser(data);
      setUsers(prev => [newUser, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await UserService.updateUser(id, data);
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await UserService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };



  const applyFilters = (newFilters: UserFilters) => {
    setFilters(newFilters);
    fetchUsers(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    fetchUsers(emptyFilters);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    filters,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    applyFilters,
    clearFilters,
    refetch: () => fetchUsers()
  };
}
