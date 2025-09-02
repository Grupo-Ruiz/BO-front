import type { CardInfo, WalletQR } from '../types/index';
import type { 
  WalletTransaction, 
  WalletBalance, 
  CreateWalletTransactionData, 
  TransferData,
  WalletTransactionFilters, 
  WalletStats 
} from '../types/index';

// Mock data para tarjetas de wallet
const mockCards: CardInfo[] = [
  { id: '1',  userId: 'user1',  userName: 'Juan Pérez',       cardNumber: '4532 1234 5678 1234', balance: 25.50,  type: 'mensual',  status: 'active',   expiryDate: '2025-12-31', lastUsed: '2024-08-04T10:30:00Z' },
  { id: '2',  userId: 'user2',  userName: 'María García',     cardNumber: '4532 5678 1234 5678', balance: 5.75,   type: 'sencillo', status: 'active',   expiryDate: '2025-06-30', lastUsed: '2024-08-03T15:45:00Z' },
  { id: '3',  userId: 'user3',  userName: 'Pedro López',      cardNumber: '5500 1122 3344 5566', balance: 12.00,  type: 'anual',    status: 'inactive', expiryDate: '2026-01-15', lastUsed: '2024-07-20T09:00:00Z' },
  { id: '4',  userId: 'user4',  userName: 'Lucía Torres',     cardNumber: '6011 2233 4455 6677', balance: 0.00,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-11-30', lastUsed: '2024-06-10T12:00:00Z' },
  { id: '5',  userId: 'user5',  userName: 'Carlos Ruiz',      cardNumber: '4539 8765 4321 8765', balance: 100.00, type: 'sencillo', status: 'active',   expiryDate: '2026-05-10', lastUsed: '2024-08-01T18:30:00Z' },
  { id: '6',  userId: 'user6',  userName: 'Ana Martínez',     cardNumber: '4916 2345 6789 2345', balance: 8.25,   type: 'mensual',  status: 'active',   expiryDate: '2025-09-22', lastUsed: '2024-07-15T14:20:00Z' },
  { id: '7',  userId: 'user7',  userName: 'Miguel Ángel',     cardNumber: '6011 9988 7766 5544', balance: 50.00,  type: 'anual',    status: 'inactive', expiryDate: '2027-03-01', lastUsed: '2024-05-30T11:10:00Z' },
  { id: '8',  userId: 'user8',  userName: 'Sofía Romero',     cardNumber: '4532 1111 2222 3333', balance: 2.50,   type: 'sencillo', status: 'active',   expiryDate: '2025-02-28', lastUsed: '2024-08-02T08:00:00Z' },
  { id: '9',  userId: 'user9',  userName: 'David Fernández',  cardNumber: '5500 3333 4444 5555', balance: 0.99,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-10-10', lastUsed: '2024-04-18T16:00:00Z' },
  { id: '10', userId: 'user10', userName: 'Elena Sánchez',    cardNumber: '6011 5555 6666 7777', balance: 15.00,  type: 'anual',    status: 'active',   expiryDate: '2026-12-12', lastUsed: '2024-08-05T19:45:00Z' },
  { id: '11', userId: 'user11', userName: 'Javier Gómez',     cardNumber: '4532 4444 5555 6666', balance: 7.80,   type: 'mensual',  status: 'inactive', expiryDate: '2025-07-07', lastUsed: '2024-07-25T10:10:00Z' },
  { id: '12', userId: 'user12', userName: 'Patricia Castro',  cardNumber: '4916 7777 8888 9999', balance: 30.00,  type: 'sencillo', status: 'active',   expiryDate: '2025-03-03', lastUsed: '2024-08-06T13:30:00Z' },
  { id: '13', userId: 'user13', userName: 'Raúl Navarro',     cardNumber: '5500 1212 3434 5656', balance: 0.00,   type: 'anual',    status: 'blocked',  expiryDate: '2024-09-09', lastUsed: '2024-03-12T09:00:00Z' },
  { id: '14', userId: 'user14', userName: 'Marta Gil',        cardNumber: '6011 2323 4545 6767', balance: 60.00,  type: 'mensual',  status: 'active',   expiryDate: '2026-08-08', lastUsed: '2024-08-07T17:00:00Z' },
  { id: '15', userId: 'user15', userName: 'Alberto Ramos',    cardNumber: '4532 5656 7878 9090', balance: 12.34,  type: 'sencillo', status: 'inactive', expiryDate: '2025-11-11', lastUsed: '2024-06-22T20:00:00Z' },
  { id: '16', userId: 'user16', userName: 'Cristina León',    cardNumber: '4916 3434 5656 7878', balance: 99.99,  type: 'anual',    status: 'active',   expiryDate: '2027-01-01', lastUsed: '2024-08-08T21:00:00Z' },
  { id: '17', userId: 'user17', userName: 'Sergio Ortega',    cardNumber: '6011 4545 6767 8989', balance: 3.21,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-12-24', lastUsed: '2024-02-14T07:00:00Z' },
  { id: '18', userId: 'user18', userName: 'Beatriz Molina',   cardNumber: '5500 6767 8989 1010', balance: 45.67,  type: 'sencillo', status: 'active',   expiryDate: '2025-04-04', lastUsed: '2024-08-09T12:00:00Z' },
  { id: '19', userId: 'user19', userName: 'Rubén Herrera',    cardNumber: '4532 8989 1010 1212', balance: 0.50,   type: 'mensual',  status: 'inactive', expiryDate: '2025-10-10', lastUsed: '2024-05-05T15:00:00Z' },
  { id: '20', userId: 'user20', userName: 'Nuria Vargas',     cardNumber: '4916 1010 1212 1313', balance: 77.77,  type: 'anual',    status: 'active',   expiryDate: '2026-06-06', lastUsed: '2024-08-10T11:00:00Z' }
];

// Mock data para transacciones de wallet
const mockWalletTransactions: WalletTransaction[] = [
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
const mockWalletBalances: WalletBalance[] = [
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

// Mock data para QR (temporal)
const mockWalletQR: WalletQR = {
  ticketNumber: "AA00119",
  equipmentType: 99,
  equipmentCode: 0,
  keyIndex: 1,
  qrVersion: 1,
  startValidity: "2025-04-10T12:00:00",
  endValidity: "2026-08-29T11:00:00",
  lineCode: 0,
  titleCode: 1000,
  fareCode: 0,
  stopType: 0,
  originCode: 0,
  destinationCode: 0,
  rawCode: "IEFBMDAxMTljAAAB9Kc3qpB/16LJA/ecSgpKw1DyxFQDnfFag01RQNMuSJQ="
};


/**
 * Simula una petición GET para obtener un QR de wallet
 */
export const getWalletQR = async (params?: Record<string, any>): Promise<WalletQR> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockWalletQR;
};

/**
 * Obtiene todas las tarjetas de un usuario
 * @returns Lista de tarjetas del usuario
 */
export const getAllCards = async (): Promise<CardInfo[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCards];
};

/**
 * Obtiene todas las tarjetas de un usuario
 * @returns Lista de tarjetas del usuario
 */
export const getCardById = async (id: string): Promise<CardInfo | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockCards.find(card => card.id === id);
};


/**
 * Obtiene todas las transacciones de wallet con filtros opcionales
 */
export const getAllWalletTransactions = async (filters?: WalletTransactionFilters): Promise<WalletTransaction[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredTransactions = [...mockWalletTransactions];
  
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
export const getWalletTransactionById = async (id: string): Promise<WalletTransaction> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const transaction = mockWalletTransactions.find(transaction => transaction.id === id);
  if (!transaction) {
    throw new Error('Transacción no encontrada');
  }
  
  return transaction;
};

/**
 * Crea una nueva transacción de wallet
 */
export const createWalletTransaction = async (transactionData: CreateWalletTransactionData): Promise<WalletTransaction> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Obtener balance actual del cliente
  const clientBalance = mockWalletBalances.find(b => 
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
  
  const reference = `${typePrefix}-${new Date().getFullYear()}-${String(mockWalletTransactions.length + 1).padStart(3, '0')}`;
  
  const balanceBefore = clientBalance.balance;
  const balanceAfter = balanceBefore + transactionData.amount;
  
  const newTransaction: WalletTransaction = {
    ...transactionData,
    id: (mockWalletTransactions.length + 1).toString(),
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
  
  mockWalletTransactions.unshift(newTransaction);
  return newTransaction;
};

/**
 * Obtiene el balance de wallet de un cliente
 */
export const getWalletBalance = async (clientId: string, currency: 'EUR' | 'USD' = 'EUR'): Promise<WalletBalance> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!clientId || clientId.trim() === '') {
    throw new Error('ID de cliente no válido');
  }
  
  const balance = mockWalletBalances.find(b => 
    b.clientId === clientId && b.currency === currency
  );
  
  if (!balance) {
    // Crear balance inicial si no existe
    const newBalance: WalletBalance = {
      clientId,
      currency,
      balance: 0,
      availableBalance: 0,
      pendingBalance: 0,
      lastUpdated: new Date().toISOString()
    };
    mockWalletBalances.push(newBalance);
    return newBalance;
  }
  
  return balance;
};

/**
 * Obtiene todos los balances de wallet
 */
export const getAllWalletBalances = async (): Promise<WalletBalance[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [...mockWalletBalances];
};

/**
 * Realiza una transferencia entre dos clientes
 */
export const transferFunds = async (transferData: TransferData): Promise<{
  outgoingTransaction: WalletTransaction;
  incomingTransaction: WalletTransaction;
}> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (transferData.fromClientId === transferData.toClientId) {
    throw new Error('No se puede transferir a la misma cuenta');
  }
  
  if (transferData.amount <= 0) {
    throw new Error('El monto debe ser mayor a 0');
  }
  
  // Verificar balance del remitente
  const senderBalance = await getWalletBalance(transferData.fromClientId, transferData.currency);
  if (transferData.amount > senderBalance.availableBalance) {
    throw new Error('Saldo insuficiente para la transferencia');
  }
  
  // Crear transacción de salida
  const outgoingTransaction = await createWalletTransaction({
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
  const incomingTransaction = await createWalletTransaction({
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
export const processDeposit = async (clientId: string, amount: number, currency: 'EUR' | 'USD' = 'EUR', description: string = 'Depósito'): Promise<WalletTransaction> => {
  if (amount <= 0) {
    throw new Error('El monto del depósito debe ser mayor a 0');
  }
  
  return createWalletTransaction({
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
export const processWithdrawal = async (clientId: string, amount: number, currency: 'EUR' | 'USD' = 'EUR', description: string = 'Retirada'): Promise<WalletTransaction> => {
  if (amount <= 0) {
    throw new Error('El monto de la retirada debe ser mayor a 0');
  }
  
  return createWalletTransaction({
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
export const searchWalletTransactions = async (filters: WalletTransactionFilters): Promise<WalletTransaction[]> => {
  return getAllWalletTransactions(filters);
};

/**
 * Obtiene transacciones de wallet paginadas
 */
export const getWalletTransactionsPaginated = async (filters: WalletTransactionFilters = {}): Promise<{
  transactions: WalletTransaction[];
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
  
  const allTransactions = await getAllWalletTransactions(filters);
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
export const getWalletStats = async (filters?: Omit<WalletTransactionFilters, 'page' | 'per_page'>): Promise<WalletStats> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const transactions = await getAllWalletTransactions(filters);
  
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
const WalletService = {
  // Operaciones CRUD principales para transacciones
  getAllTransactions: getAllWalletTransactions,
  getAllWalletTransactions,
  getTransactionsPaginated: getWalletTransactionsPaginated,
  getWalletTransactionsPaginated,
  getTransactionById: getWalletTransactionById,
  getWalletTransactionById,
  createTransaction: createWalletTransaction,
  createWalletTransaction,
  searchTransactions: searchWalletTransactions,
  searchWalletTransactions,

  // Operaciones de balance
  getBalance: getWalletBalance,
  getWalletBalance,
  getAllBalances: getAllWalletBalances,
  getAllWalletBalances,

  // Operaciones específicas
  transfer: transferFunds,
  transferFunds,
  deposit: processDeposit,
  processDeposit,
  withdrawal: processWithdrawal,
  processWithdrawal,
  getStats: getWalletStats,
  getWalletStats,
};

export default WalletService;