import { useState, useCallback, useEffect } from 'react';
import type { User, UserFilters } from '../types';

export function useUsersApi(initialFilters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number; pageSize: number }>({ total: 0, page: 0, pageSize: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  // Llama a la API real
  const fetchUsers = useCallback(async (filters: UserFilters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters as any).toString();
      const res = await fetch(`http://127.0.0.1:5000/api/v1/usuarios/users?${params}`);
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const { data, meta } = await res.json();

      setUsers(data);
      setMeta(meta);
      setLastFetch(Date.now());

    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');

    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoización: solo consulta si pasaron más de 10 segundos
  const getUsers = useCallback((filters: UserFilters = {}) => {
    const now = Date.now();
    if (now - lastFetch > 10000) {
      fetchUsers(filters);
    }
    // Si no, no hace nada (o puedes devolver los datos actuales)
  }, [lastFetch, fetchUsers]);

  // Forzar refresco inmediato
  const refetch = useCallback((filters: UserFilters = {}) => {
    fetchUsers(filters);
  }, [fetchUsers]);

  useEffect(() => {
    if (initialFilters) {
      fetchUsers(initialFilters);
    } else {
      fetchUsers();
    }
  }, [fetchUsers, initialFilters]);

  return {
    users,
    meta,
    isLoading,
    error,
    getUsers,
    refetch,
    lastFetch,
  };
}