import { useState, useCallback } from 'react';
import { Services } from '../services';

/**
 * Hook personalizado para gestionar el estado de los servicios
 * Proporciona funcionalidades comunes como loading, error handling, y data fetching
 */
export function useServices() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeService = useCallback(async <T>(
    serviceFunction: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: any) => void
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await serviceFunction();
      onSuccess?.(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Error desconocido';
      setError(errorMessage);
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    executeService,
    clearError,
    // Acceso directo a todos los servicios
    services: Services
  };
}

/**
 * Hook especializado para usuarios
 */
export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const { executeService, loading, error, clearError } = useServices();

  const loadUsers = useCallback(async (filters?: any) => {
    const result = await executeService(
      () => Services.users.getAll(filters),
      (data) => setUsers(data as any[])
    );
    return result;
  }, [executeService]);

  const loadUsersPaginated = useCallback(async (params?: any) => {
    return await executeService(
      () => Services.users.getPaginated(params)
    );
  }, [executeService]);

  const createUser = useCallback(async (userData: any) => {
    return await executeService(
      () => Services.users.create(userData),
      () => loadUsers() // Recargar usuarios después de crear
    );
  }, [executeService, loadUsers]);

  const updateUser = useCallback(async (id: string, userData: any) => {
    return await executeService(
      () => Services.users.update(id, userData),
      () => loadUsers() // Recargar usuarios después de actualizar
    );
  }, [executeService, loadUsers]);

  const deleteUser = useCallback(async (id: string) => {
    return await executeService(
      () => Services.users.delete(id),
      () => loadUsers() // Recargar usuarios después de eliminar
    );
  }, [executeService, loadUsers]);

  return {
    users,
    setUsers,
    loading,
    error,
    clearError,
    loadUsers,
    loadUsersPaginated,
    createUser,
    updateUser,
    deleteUser
  };
}

/**
 * Hook especializado para clientes
 */
export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const { executeService, loading, error, clearError } = useServices();

  const loadClients = useCallback(async (filters?: any) => {
    const result = await executeService(
      () => Services.clients.getAll(filters),
      (data) => setClients(data as any[])
    );
    return result;
  }, [executeService]);

  const loadClientsPaginated = useCallback(async (params?: any) => {
    return await executeService(
      () => Services.clients.getPaginated(params)
    );
  }, [executeService]);

  const createClient = useCallback(async (clientData: any) => {
    return await executeService(
      () => Services.clients.create(clientData),
      () => loadClients() // Recargar clientes después de crear
    );
  }, [executeService, loadClients]);

  const updateClient = useCallback(async (id: string, clientData: any) => {
    return await executeService(
      () => Services.clients.update(id, clientData),
      () => loadClients() // Recargar clientes después de actualizar
    );
  }, [executeService, loadClients]);

  const deleteClient = useCallback(async (id: string) => {
    return await executeService(
      () => Services.clients.delete(id),
      () => loadClients() // Recargar clientes después de eliminar
    );
  }, [executeService, loadClients]);

  const updateClientBalance = useCallback(async (clientId: string, amount: number, operation: 'add' | 'subtract') => {
    return await executeService(
      () => Services.clients.updateBalance(clientId, amount, operation),
      () => loadClients() // Recargar clientes después de actualizar balance
    );
  }, [executeService, loadClients]);

  return {
    clients,
    setClients,
    loading,
    error,
    clearError,
    loadClients,
    loadClientsPaginated,
    createClient,
    updateClient,
    deleteClient,
    updateClientBalance
  };
}

/**
 * Hook especializado para operaciones
 */
export function useOperations() {
  const [operations, setOperations] = useState<any[]>([]);
  const { executeService, loading, error, clearError } = useServices();

  const loadOperations = useCallback(async (filters?: any) => {
    const result = await executeService(
      () => Services.operations.getAll(filters),
      (data) => setOperations(data as any[])
    );
    return result;
  }, [executeService]);

  const createOperation = useCallback(async (operationData: any) => {
    return await executeService(
      () => Services.operations.create(operationData),
      () => loadOperations() // Recargar operaciones después de crear
    );
  }, [executeService, loadOperations]);

  const processOperation = useCallback(async (id: string) => {
    return await executeService(
      () => Services.operations.process(id),
      () => loadOperations() // Recargar operaciones después de procesar
    );
  }, [executeService, loadOperations]);

  const cancelOperation = useCallback(async (id: string, reason?: string) => {
    return await executeService(
      () => Services.operations.cancel(id, reason),
      () => loadOperations() // Recargar operaciones después de cancelar
    );
  }, [executeService, loadOperations]);

  const getOperationStats = useCallback(async (params?: any) => {
    return await executeService(
      () => Services.operations.getStats(params)
    );
  }, [executeService]);

  return {
    operations,
    setOperations,
    loading,
    error,
    clearError,
    loadOperations,
    createOperation,
    processOperation,
    cancelOperation,
    getOperationStats
  };
}

/**
 * Hook especializado para pagos
 */
export function usePayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const { executeService, loading, error, clearError } = useServices();

  const loadPayments = useCallback(async (filters?: any) => {
    const result = await executeService(
      () => Services.payments.getAll(filters),
      (data) => setPayments(data as any[])
    );
    return result;
  }, [executeService]);

  const createPayment = useCallback(async (paymentData: any) => {
    return await executeService(
      () => Services.payments.create(paymentData),
      () => loadPayments() // Recargar pagos después de crear
    );
  }, [executeService, loadPayments]);

  const processPayment = useCallback(async (id: string) => {
    return await executeService(
      () => Services.payments.process(id),
      () => loadPayments() // Recargar pagos después de procesar
    );
  }, [executeService, loadPayments]);

  const refundPayment = useCallback(async (id: string, reason?: string) => {
    return await executeService(
      () => Services.payments.refund(id, reason),
      () => loadPayments() // Recargar pagos después de reembolso
    );
  }, [executeService, loadPayments]);

  const getPaymentStats = useCallback(async (params?: any) => {
    return await executeService(
      () => Services.payments.getStats(params)
    );
  }, [executeService]);

  const loadMerchants = useCallback(async () => {
    return await executeService(
      () => Services.payments.getAllMerchants()
    );
  }, [executeService]);

  const loadCategories = useCallback(async () => {
    return await executeService(
      () => Services.payments.getAllCategories()
    );
  }, [executeService]);

  return {
    payments,
    setPayments,
    loading,
    error,
    clearError,
    loadPayments,
    createPayment,
    processPayment,
    refundPayment,
    getPaymentStats,
    loadMerchants,
    loadCategories
  };
}

/**
 * Hook especializado para wallet
 */
export function useWallet() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const { executeService, loading, error, clearError } = useServices();

  const loadTransactions = useCallback(async (clientId: string, filters?: any) => {
    const result = await executeService(
      () => Services.wallet.getTransactions(clientId, filters),
      (data) => setTransactions(data as any[])
    );
    return result;
  }, [executeService]);

  const getBalance = useCallback(async (clientId: string) => {
    return await executeService(
      () => Services.wallet.getBalance(clientId)
    );
  }, [executeService]);

  const transferFunds = useCallback(async (transferData: any) => {
    return await executeService(
      () => Services.wallet.transfer(transferData),
      () => {
        // Recargar transacciones si están cargadas
        if (transactions.length > 0) {
          const firstTransaction = transactions[0];
          if (firstTransaction?.clientId) {
            loadTransactions(firstTransaction.clientId);
          }
        }
      }
    );
  }, [executeService, transactions, loadTransactions]);

  const processDeposit = useCallback(async (depositData: any) => {
    return await executeService(
      () => Services.wallet.deposit(depositData),
      () => {
        if (depositData.clientId) {
          loadTransactions(depositData.clientId);
        }
      }
    );
  }, [executeService, loadTransactions]);

  const processWithdrawal = useCallback(async (withdrawalData: any) => {
    return await executeService(
      () => Services.wallet.withdraw(withdrawalData),
      () => {
        if (withdrawalData.clientId) {
          loadTransactions(withdrawalData.clientId);
        }
      }
    );
  }, [executeService, loadTransactions]);

  return {
    transactions,
    setTransactions,
    loading,
    error,
    clearError,
    loadTransactions,
    getBalance,
    transferFunds,
    processDeposit,
    processWithdrawal
  };
}

/**
 * Hook para operaciones combinadas
 * Útil para dashboards que necesitan datos de múltiples servicios
 */
export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const { executeService, loading, error, clearError } = useServices();

  const loadDashboardData = useCallback(async (clientId?: string) => {
    const result = await executeService(
      async () => {
        const [users, clients, operations, payments, walletBalance] = await Promise.all([
          Services.users.getAll({ per_page: 5 }),
          Services.clients.getAll({ status: 'active', per_page: 10 }),
          Services.operations.getAll({ per_page: 10 }),
          Services.payments.getAll({ status: 'completed', per_page: 10 }),
          clientId ? Services.wallet.getBalance(clientId) : Promise.resolve(null)
        ]);

        const [operationStats, paymentStats] = await Promise.all([
          Services.operations.getStats(),
          Services.payments.getStats()
        ]);

        return {
          users,
          clients,
          operations,
          payments,
          walletBalance,
          operationStats,
          paymentStats,
          summary: {
            totalUsers: users.length,
            activeClients: clients.length,
            totalOperations: operations.length,
            completedPayments: payments.length,
            timestamp: new Date().toISOString()
          }
        };
      },
      (data) => setDashboardData(data)
    );
    return result;
  }, [executeService]);

  const refreshDashboard = useCallback(() => {
    return loadDashboardData();
  }, [loadDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    clearError,
    loadDashboardData,
    refreshDashboard
  };
}
