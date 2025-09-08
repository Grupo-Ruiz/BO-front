import { mockCards } from '@/modules/cards/services/cardService';
import type { CreateTransactionData, ManagementBalance, ManagementStats, Transaction, TransactionFilters, TransferData } from '../types';
import type { WalletBalance } from '@/modules/wallet';

// Mock data para transacciones de wallet
const mockTransactions: Transaction[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Ana García López',
    type: 'deposit',
    amount: 100.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Depósito desde tarjeta bancaria',
    reference: 'DEP-2024-001',
    balanceBefore: 1150.75,
    balanceAfter: 1250.75,
    createdAt: '2024-08-01T10:30:00Z',
    updatedAt: '2024-08-01T10:32:00Z',
    processedAt: '2024-08-01T10:32:00Z',
  },
  {
    id: '2',
    clientId: '1',
    clientName: 'Ana García López',
    type: 'payment',
    amount: -25.50,
    currency: 'EUR',
    status: 'completed',
    description: 'Pago en Supermercado Central',
    reference: 'PAY-2024-001',
    balanceBefore: 1250.75,
    balanceAfter: 1225.25,
    relatedTransactionId: '1', // ID del pago en payments
    createdAt: '2024-08-01T14:30:00Z',
    updatedAt: '2024-08-01T14:31:00Z',
    processedAt: '2024-08-01T14:31:00Z',
  },
  {
    id: '3',
    clientId: '1',
    clientName: 'Ana García López',
    type: 'transfer_out',
    amount: -75.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Transferencia a Carlos Martínez',
    reference: 'TRF-2024-001',
    balanceBefore: 1225.25,
    balanceAfter: 1150.25,
    relatedTransactionId: '4', // ID de la transacción de recepción
    createdAt: '2024-08-02T09:45:00Z',
    updatedAt: '2024-08-02T09:46:00Z',
    processedAt: '2024-08-02T09:46:00Z',
    metadata: {
      recipientId: '2',
      recipientName: 'Carlos Martínez'
    }
  },
  {
    id: '4',
    clientId: '2',
    clientName: 'Carlos Martínez',
    type: 'transfer_in',
    amount: 75.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Transferencia de Ana García López',
    reference: 'TRF-2024-001',
    balanceBefore: 265.20,
    balanceAfter: 340.20,
    relatedTransactionId: '3', // ID de la transacción de envío
    createdAt: '2024-08-02T09:45:00Z',
    updatedAt: '2024-08-02T09:46:00Z',
    processedAt: '2024-08-02T09:46:00Z',
    metadata: {
      senderId: '1',
      senderName: 'Ana García López'
    }
  },
  {
    id: '5',
    clientId: '2',
    clientName: 'Carlos Martínez',
    type: 'deposit',
    amount: 50.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Recarga desde cuenta bancaria',
    reference: 'DEP-2024-002',
    balanceBefore: 340.20,
    balanceAfter: 390.20,
    createdAt: '2024-08-02T18:10:00Z',
    updatedAt: '2024-08-02T18:12:00Z',
    processedAt: '2024-08-02T18:12:00Z',
  }
];

// Mock data para balances de wallet
const mockBalances: ManagementBalance[] = [
  {
    clientId: '1',
    currency: 'EUR',
    balance: 1150.25,
    availableBalance: 1150.25,
    pendingBalance: 0,
    lastUpdated: '2024-08-02T09:46:00Z'
  },
  {
    clientId: '2',
    currency: 'EUR',
    balance: 390.20,
    availableBalance: 390.20,
    pendingBalance: 0,
    lastUpdated: '2024-08-02T18:12:00Z'
  },
  {
    clientId: '3',
    currency: 'EUR',
    balance: 0,
    availableBalance: 0,
    pendingBalance: 0,
    lastUpdated: '2024-07-25T16:30:00Z'
  }
];

/**
 * Obtiene todas las transacciones de wallet con filtros opcionales
 */
export const getAllTransactions = async (filters?: TransactionFilters): Promise<Transaction[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredTransactions = [...mockTransactions];
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredTransactions = filteredTransactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchLower) ||
      transaction.reference.toLowerCase().includes(searchLower) ||
      transaction.clientName?.toLowerCase().includes(searchLower) ||
      transaction.id.includes(searchLower)
    );
  }
  
  if (filters?.type) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.type === filters.type);
  }
  
  if (filters?.status) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.status === filters.status);
  }
  
  if (filters?.currency) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.currency === filters.currency);
  }
  
  if (filters?.clientId) {
    filteredTransactions = filteredTransactions.filter(transaction => transaction.clientId === filters.clientId);
  }
  
  if (filters?.minAmount !== undefined) {
    filteredTransactions = filteredTransactions.filter(transaction => Math.abs(transaction.amount) >= filters.minAmount!);
  }
  
  if (filters?.maxAmount !== undefined) {
    filteredTransactions = filteredTransactions.filter(transaction => Math.abs(transaction.amount) <= filters.maxAmount!);
  }
  
  if (filters?.dateFrom) {
    const dateFrom = new Date(filters.dateFrom);
    filteredTransactions = filteredTransactions.filter(transaction => 
      new Date(transaction.createdAt) >= dateFrom
    );
  }
  
  if (filters?.dateTo) {
    const dateTo = new Date(filters.dateTo);
    filteredTransactions = filteredTransactions.filter(transaction => 
      new Date(transaction.createdAt) <= dateTo
    );
  }
  
  // Ordenar por fecha de creación (más recientes primero)
  return filteredTransactions.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Obtiene una transacción de wallet por ID
 */
export const getTransactionById = async (id: string): Promise<Transaction> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const transaction = mockTransactions.find(transaction => transaction.id === id);
  if (!transaction) {
    throw new Error('Transacción no encontrada');
  }
  
  return transaction;
};

/**
 * Crea una nueva transacción de wallet
 */
export const createTransaction = async (transactionData: CreateTransactionData): Promise<Transaction> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Obtener balance actual del cliente
  const clientBalance = mockBalances.find(b => 
    b.clientId === transactionData.clientId && 
    b.currency === transactionData.currency
  );
  
  if (!clientBalance) {
    throw new Error('Balance del cliente no encontrado');
  }
  
  // Verificar si hay suficientes fondos para transacciones negativas
  if (transactionData.amount < 0 && Math.abs(transactionData.amount) > clientBalance.availableBalance) {
    throw new Error('Saldo insuficiente');
  }
  
  // Generar referencia única basada en tipo
  const typePrefix = {
    'deposit': 'DEP',
    'withdrawal': 'WTH',
    'transfer_in': 'TRF_IN',
    'transfer_out': 'TRF_OUT',
    'payment': 'PAY',
    'refund': 'REF',
    'fee': 'FEE'
  }[transactionData.type];
  
  const reference = `${typePrefix}-${new Date().getFullYear()}-${String(mockTransactions.length + 1).padStart(3, '0')}`;
  
  const balanceBefore = clientBalance.balance;
  const balanceAfter = balanceBefore + transactionData.amount;
  
  // Buscar el nombre del cliente
  const clientCard = mockCards.find(card => card.userId === transactionData.clientId);
  const clientName = clientCard ? clientCard.userName : 'Cliente';

  const newTransaction: Transaction = {
    ...transactionData,
    clientName,
    id: (mockTransactions.length + 1).toString(),
    status: 'completed', // En este mock completamos inmediatamente
    reference,
    balanceBefore,
    balanceAfter,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    processedAt: new Date().toISOString(),
  };
  
  // Actualizar balance del cliente
  clientBalance.balance = balanceAfter;
  clientBalance.availableBalance = balanceAfter;
  clientBalance.lastUpdated = new Date().toISOString();
  
  mockTransactions.unshift(newTransaction);
  return newTransaction;
};

/**
 * Obtiene el balance de wallet de un cliente
 */
export const getBalance = async (clientId: string, currency: 'EUR' | 'USD' = 'EUR'): Promise<WalletBalance> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!clientId || clientId.trim() === '') {
    throw new Error('ID de cliente no válido');
  }
  
  const balance = mockBalances.find(b => 
    b.clientId === clientId && b.currency === currency
  );
  
  if (!balance) {
    // Crear balance inicial si no existe
    const newBalance: ManagementBalance = {
      clientId,   
      currency,
      balance: 0,
      availableBalance: 0,
      pendingBalance: 0,
      lastUpdated: new Date().toISOString()
    };
    mockBalances.push(newBalance);
    return newBalance;
  }
  
  return balance;
};

/**
 * Obtiene todos los balances de wallet
 */
export const getAllBalances = async (): Promise<ManagementBalance[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [...mockBalances];
};

/**
 * Realiza una transferencia entre dos clientes
 */
export const transferFunds = async (transferData: TransferData): Promise<{
  outgoingTransaction: Transaction;
  incomingTransaction: Transaction;
}> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (transferData.fromClientId === transferData.toClientId) {
    throw new Error('No se puede transferir a la misma cuenta');
  }
  
  if (transferData.amount <= 0) {
    throw new Error('El monto debe ser mayor a 0');
  }
  
  // Verificar balance del remitente
  const senderBalance = await getBalance(transferData.fromClientId, transferData.currency);
  if (transferData.amount > senderBalance.availableBalance) {
    throw new Error('Saldo insuficiente para la transferencia');
  }
  
  // Crear transacción de salida
  const outgoingTransaction = await createTransaction({
    clientId: transferData.fromClientId,
    type: 'transfer_out',
    amount: -transferData.amount, // Negativo para el remitente
    currency: transferData.currency,
    description: transferData.description,
    metadata: {
      ...transferData.metadata,
      recipientId: transferData.toClientId
    }
  });
  
  // Crear transacción de entrada
  const incomingTransaction = await createTransaction({
    clientId: transferData.toClientId,
    type: 'transfer_in',
    amount: transferData.amount, // Positivo para el receptor
    currency: transferData.currency,
    description: transferData.description,
    relatedTransactionId: outgoingTransaction.id,
    metadata: {
      ...transferData.metadata,
      senderId: transferData.fromClientId
    }
  });
  
  // Relacionar las transacciones
  outgoingTransaction.relatedTransactionId = incomingTransaction.id;
  
  return {
    outgoingTransaction,
    incomingTransaction
  };
};

/**
 * Procesa un depósito
 */
export const processDeposit = async (clientId: string, amount: number, currency: 'EUR' | 'USD' = 'EUR', description: string = 'Depósito'): Promise<Transaction> => {
  if (amount <= 0) {
    throw new Error('El monto del depósito debe ser mayor a 0');
  }
  
  return createTransaction({
    clientId,
    type: 'deposit',
    amount,
    currency,
    description,
  });
};

/**
 * Procesa una retirada
 */
export const processWithdrawal = async (clientId: string, amount: number, currency: 'EUR' | 'USD' = 'EUR', description: string = 'Retirada'): Promise<Transaction> => {
  if (amount <= 0) {
    throw new Error('El monto de la retirada debe ser mayor a 0');
  }
  
  return createTransaction({
    clientId,
    type: 'withdrawal',
    amount: -amount, // Negativo para retiradas
    currency,
    description,
  });
};

/**
 * Busca transacciones de wallet (alias para getAllWalletTransactions con filtros)
 */
export const searchTransactions = async (filters: TransactionFilters): Promise<Transaction[]> => {
  return getAllTransactions(filters);
};

/**
 * Obtiene transacciones de wallet paginadas
 */
export const getTransactionsPaginated = async (filters: TransactionFilters = {}): Promise<{
  transactions: Transaction[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}> => {
  const page = filters.page || 1;
  const perPage = filters.per_page || 10;
  
  const allTransactions = await getAllTransactions(filters);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedTransactions = allTransactions.slice(startIndex, endIndex);
  
  return {
    transactions: paginatedTransactions,
    pagination: {
      current_page: page,
      last_page: Math.ceil(allTransactions.length / perPage),
      per_page: perPage,
      total: allTransactions.length,
      from: startIndex + 1,
      to: Math.min(endIndex, allTransactions.length),
    }
  };
};

/**
 * Obtiene estadísticas de wallet
 */
export const getStats = async (filters?: Omit<TransactionFilters, 'page' | 'per_page'>): Promise<ManagementStats> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const transactions = await getAllTransactions(filters);
  
  const transactionsByType = transactions.reduce((acc, transaction) => {
    acc[transaction.type] = (acc[transaction.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const transactionsByStatus = transactions.reduce((acc, transaction) => {
    acc[transaction.status] = (acc[transaction.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalVolume = transactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  const totalDeposits = transactions
    .filter(t => t.type === 'deposit' || t.type === 'transfer_in')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalWithdrawals = transactions
    .filter(t => t.type === 'withdrawal' || t.type === 'transfer_out')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  return {
    totalTransactions: transactions.length,
    totalVolume,
    transactionsByType,
    transactionsByStatus,
    averageTransaction: transactions.length > 0 ? totalVolume / transactions.length : 0,
    totalDeposits,
    totalWithdrawals,
    netFlow: totalDeposits - totalWithdrawals,
  };
};

// Exportación del servicio completo para uso externo
const ManagementService = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  getBalance,
  getAllBalances,
  transferFunds,
  processDeposit,
  processWithdrawal,
  searchTransactions,
  getTransactionsPaginated,
  getStats,
};

export default ManagementService;