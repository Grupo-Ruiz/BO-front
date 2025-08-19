import { useState, useEffect } from 'react';
import type { Client, CreateClientData, UpdateClientData, ClientFilters } from '../types';
import { ClientService } from '../services/ClientService';

export function useClients(initialFilters?: ClientFilters) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClientFilters>(initialFilters || {});

  const fetchClients = async (newFilters?: ClientFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filtersToUse = newFilters || filters;
      const data = await ClientService.getClients(filtersToUse);
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  const createClient = async (data: CreateClientData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newClient = await ClientService.createClient(data);
      setClients(prev => [newClient, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateClient = async (id: string, data: UpdateClientData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedClient = await ClientService.updateClient(id, data);
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClient = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await ClientService.deleteClient(id);
      setClients(prev => prev.filter(client => client.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const suspendClient = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedClient = await ClientService.suspendClient(id);
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al suspender cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const activateClient = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedClient = await ClientService.activateClient(id);
      setClients(prev => prev.map(client => 
        client.id === id ? updatedClient : client
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al activar cliente');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (newFilters: ClientFilters) => {
    setFilters(newFilters);
    fetchClients(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    fetchClients(emptyFilters);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    isLoading,
    error,
    filters,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    suspendClient,
    activateClient,
    applyFilters,
    clearFilters,
    refetch: () => fetchClients()
  };
}
