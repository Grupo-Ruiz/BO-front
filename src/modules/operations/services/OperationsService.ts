import type { Operation, CreateOperationData, UpdateOperationData, OperationFilters, OperationStats } from '../types';

// Mock data para operaciones
const mockOperations: Operation[] = [
  {
    id: '1',
    type: 'recharge',
    amount: 100.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Recarga de saldo',
    clientId: '1',
    clientName: 'Ana García López',
    reference: 'RCG-2024-001',
    createdAt: '2024-08-01T10:30:00Z',
    updatedAt: '2024-08-01T10:35:00Z',
    processedAt: '2024-08-01T10:35:00Z',
  },
  {
    id: '2',
    type: 'payment',
    amount: 25.50,
    currency: 'EUR',
    status: 'completed',
    description: 'Pago en comercio asociado',
    clientId: '1',
    clientName: 'Ana García López',
    reference: 'PAY-2024-002',
    createdAt: '2024-08-01T14:15:00Z',
    updatedAt: '2024-08-01T14:16:00Z',
    processedAt: '2024-08-01T14:16:00Z',
  },
  {
    id: '3',
    type: 'transfer',
    amount: 75.00,
    currency: 'EUR',
    status: 'pending',
    description: 'Transferencia a Carlos Martínez',
    clientId: '1',
    clientName: 'Ana García López',
    reference: 'TRF-2024-003',
    createdAt: '2024-08-02T09:45:00Z',
    updatedAt: '2024-08-02T09:45:00Z',
    metadata: {
      recipientId: '2',
      recipientName: 'Carlos Martínez'
    }
  },
  {
    id: '4',
    type: 'withdrawal',
    amount: 200.00,
    currency: 'EUR',
    status: 'failed',
    description: 'Retirada de efectivo en ATM',
    clientId: '2',
    clientName: 'Carlos Martínez',
    reference: 'WTH-2024-004',
    createdAt: '2024-08-02T16:20:00Z',
    updatedAt: '2024-08-02T16:22:00Z',
    errorMessage: 'Saldo insuficiente',
  },
  {
    id: '5',
    type: 'recharge',
    amount: 50.00,
    currency: 'EUR',
    status: 'completed',
    description: 'Recarga desde tarjeta',
    clientId: '2',
    clientName: 'Carlos Martínez',
    reference: 'RCG-2024-005',
    createdAt: '2024-08-02T18:10:00Z',
    updatedAt: '2024-08-02T18:12:00Z',
    processedAt: '2024-08-02T18:12:00Z',
  }
];

/**
 * Servicio para gestión de operaciones
 * Proporciona funciones para operaciones CRUD con datos mock
 */

/**
 * Obtiene todas las operaciones con filtros opcionales
 */
export const getAllOperations = async (filters?: OperationFilters): Promise<Operation[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredOperations = [...mockOperations];
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredOperations = filteredOperations.filter(operation =>
      operation.description.toLowerCase().includes(searchLower) ||
      operation.reference.toLowerCase().includes(searchLower) ||
      operation.clientName?.toLowerCase().includes(searchLower) ||
      operation.id.includes(searchLower)
    );
  }
  
  if (filters?.type) {
    filteredOperations = filteredOperations.filter(operation => operation.type === filters.type);
  }
  
  if (filters?.status) {
    filteredOperations = filteredOperations.filter(operation => operation.status === filters.status);
  }
  
  if (filters?.currency) {
    filteredOperations = filteredOperations.filter(operation => operation.currency === filters.currency);
  }
  
  if (filters?.clientId) {
    filteredOperations = filteredOperations.filter(operation => operation.clientId === filters.clientId);
  }
  
  if (filters?.minAmount !== undefined) {
    filteredOperations = filteredOperations.filter(operation => operation.amount >= filters.minAmount!);
  }
  
  if (filters?.maxAmount !== undefined) {
    filteredOperations = filteredOperations.filter(operation => operation.amount <= filters.maxAmount!);
  }
  
  if (filters?.dateFrom) {
    const dateFrom = new Date(filters.dateFrom);
    filteredOperations = filteredOperations.filter(operation => 
      new Date(operation.createdAt) >= dateFrom
    );
  }
  
  if (filters?.dateTo) {
    const dateTo = new Date(filters.dateTo);
    filteredOperations = filteredOperations.filter(operation => 
      new Date(operation.createdAt) <= dateTo
    );
  }
  
  // Ordenar por fecha de creación (más recientes primero)
  return filteredOperations.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Obtiene una operación por ID
 */
export const getOperationById = async (id: string): Promise<Operation> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const operation = mockOperations.find(operation => operation.id === id);
  if (!operation) {
    throw new Error('Operación no encontrada');
  }
  
  return operation;
};

/**
 * Crea una nueva operación
 */
export const createOperation = async (operationData: CreateOperationData): Promise<Operation> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generar referencia única
  const typePrefix = {
    'recharge': 'RCG',
    'payment': 'PAY',
    'transfer': 'TRF',
    'withdrawal': 'WTH'
  }[operationData.type];
  
  const reference = `${typePrefix}-${new Date().getFullYear()}-${String(mockOperations.length + 1).padStart(3, '0')}`;
  
  const newOperation: Operation = {
    ...operationData,
    id: (mockOperations.length + 1).toString(),
    status: 'pending',
    reference,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockOperations.unshift(newOperation); // Agregar al inicio para que sea la más reciente
  return newOperation;
};

/**
 * Actualiza una operación existente
 */
export const updateOperation = async (id: string, operationData: UpdateOperationData): Promise<Operation> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const operationIndex = mockOperations.findIndex(operation => operation.id === id);
  if (operationIndex === -1) {
    throw new Error('Operación no encontrada');
  }
  
  // Limpiar datos vacíos
  const cleanData: Partial<UpdateOperationData> = {};
  Object.entries(operationData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanData[key as keyof UpdateOperationData] = value;
    }
  });
  
  // Si se está completando la operación, agregar fecha de procesamiento
  if (cleanData.status === 'completed' && mockOperations[operationIndex].status !== 'completed') {
    mockOperations[operationIndex].processedAt = new Date().toISOString();
  }
  
  mockOperations[operationIndex] = {
    ...mockOperations[operationIndex],
    ...cleanData,
    updatedAt: new Date().toISOString(),
  };
  
  return mockOperations[operationIndex];
};

/**
 * Cancela una operación (solo si está pendiente)
 */
export const cancelOperation = async (id: string): Promise<Operation> => {
  const operation = await getOperationById(id);
  
  if (operation.status !== 'pending') {
    throw new Error('Solo se pueden cancelar operaciones pendientes');
  }
  
  return updateOperation(id, { status: 'cancelled' });
};

/**
 * Procesa una operación pendiente
 */
export const processOperation = async (id: string): Promise<Operation> => {
  const operation = await getOperationById(id);
  
  if (operation.status !== 'pending') {
    throw new Error('Solo se pueden procesar operaciones pendientes');
  }
  
  // Simular procesamiento que puede fallar ocasionalmente
  const shouldFail = Math.random() < 0.1; // 10% de probabilidad de fallo
  
  if (shouldFail) {
    return updateOperation(id, { 
      status: 'failed',
      errorMessage: 'Error de procesamiento simulado'
    });
  }
  
  return updateOperation(id, { status: 'completed' });
};

/**
 * Busca operaciones (alias para getAllOperations con filtros)
 */
export const searchOperations = async (filters: OperationFilters): Promise<Operation[]> => {
  return getAllOperations(filters);
};

/**
 * Obtiene operaciones paginadas
 */
export const getOperationsPaginated = async (filters: OperationFilters = {}): Promise<{
  operations: Operation[];
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
  
  const allOperations = await getAllOperations(filters);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedOperations = allOperations.slice(startIndex, endIndex);
  
  return {
    operations: paginatedOperations,
    pagination: {
      current_page: page,
      last_page: Math.ceil(allOperations.length / perPage),
      per_page: perPage,
      total: allOperations.length,
      from: startIndex + 1,
      to: Math.min(endIndex, allOperations.length),
    }
  };
};

/**
 * Obtiene estadísticas de operaciones
 */
export const getOperationStats = async (filters?: Omit<OperationFilters, 'page' | 'per_page'>): Promise<OperationStats> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const operations = await getAllOperations(filters);
  
  const operationsByType = operations.reduce((acc, operation) => {
    acc[operation.type] = (acc[operation.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const operationsByStatus = operations.reduce((acc, operation) => {
    acc[operation.status] = (acc[operation.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalAmount = operations.reduce((sum, operation) => sum + operation.amount, 0);
  
  return {
    totalOperations: operations.length,
    totalAmount,
    operationsByType,
    operationsByStatus,
    averageAmount: operations.length > 0 ? totalAmount / operations.length : 0,
  };
};

// Exportación del servicio completo para uso externo
const OperationsService = {
  // Operaciones CRUD principales
  getAll: getAllOperations,
  getAllOperations,
  getPaginated: getOperationsPaginated,
  getOperationsPaginated,
  getById: getOperationById,
  getOperationById,
  create: createOperation,
  createOperation,
  update: updateOperation,
  updateOperation,
  search: searchOperations,
  searchOperations,

  // Operaciones específicas
  cancel: cancelOperation,
  cancelOperation,
  process: processOperation,
  processOperation,
  getStats: getOperationStats,
  getOperationStats,
};

export default OperationsService;
