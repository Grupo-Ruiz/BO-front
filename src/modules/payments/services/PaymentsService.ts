import type { Payment, CreatePaymentData, UpdatePaymentData, PaymentFilters, PaymentStats, Merchant, PaymentCategory } from '../types';

// Mock data para pagos
const mockPayments: Payment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Ana García López',
    amount: 25.50,
    currency: 'EUR',
    status: 'completed',
    paymentMethod: 'wallet',
    description: 'Compra en Supermercado Central',
    reference: 'PAY-2024-001',
    merchantId: 'MERCH-001',
    merchantName: 'Supermercado Central',
    categoryId: 'CAT-001',
    categoryName: 'Alimentación',
    location: 'Madrid, España',
    createdAt: '2024-08-01T14:30:00Z',
    updatedAt: '2024-08-01T14:31:00Z',
    processedAt: '2024-08-01T14:31:00Z',
    fees: {
      amount: 0.25,
      type: 'percentage',
      description: 'Comisión de transacción 1%'
    }
  },
  {
    id: '2',
    clientId: '1',
    clientName: 'Ana García López',
    amount: 12.80,
    currency: 'EUR',
    status: 'completed',
    paymentMethod: 'card',
    description: 'Café y desayuno - Cafetería Luna',
    reference: 'PAY-2024-002',
    merchantId: 'MERCH-002',
    merchantName: 'Cafetería Luna',
    categoryId: 'CAT-002',
    categoryName: 'Restauración',
    location: 'Madrid, España',
    createdAt: '2024-08-02T09:15:00Z',
    updatedAt: '2024-08-02T09:16:00Z',
    processedAt: '2024-08-02T09:16:00Z',
    fees: {
      amount: 0.50,
      type: 'fixed',
      description: 'Comisión fija por pago con tarjeta'
    }
  },
  {
    id: '3',
    clientId: '2',
    clientName: 'Carlos Martínez',
    amount: 89.99,
    currency: 'EUR',
    status: 'pending',
    paymentMethod: 'wallet',
    description: 'Compra online - Tienda Tech',
    reference: 'PAY-2024-003',
    merchantId: 'MERCH-003',
    merchantName: 'Tienda Tech Online',
    categoryId: 'CAT-003',
    categoryName: 'Tecnología',
    createdAt: '2024-08-02T16:45:00Z',
    updatedAt: '2024-08-02T16:45:00Z',
  },
  {
    id: '4',
    clientId: '2',
    clientName: 'Carlos Martínez',
    amount: 45.00,
    currency: 'EUR',
    status: 'failed',
    paymentMethod: 'card',
    description: 'Pago de gasolina',
    reference: 'PAY-2024-004',
    merchantId: 'MERCH-004',
    merchantName: 'Gasolinera Repsol',
    categoryId: 'CAT-004',
    categoryName: 'Transporte',
    location: 'Barcelona, España',
    createdAt: '2024-08-02T18:20:00Z',
    updatedAt: '2024-08-02T18:22:00Z',
    errorMessage: 'Tarjeta rechazada por el banco emisor',
  }
];

// Mock data para comercios
const mockMerchants: Merchant[] = [
  {
    id: 'MERCH-001',
    name: 'Supermercado Central',
    category: 'Alimentación',
    status: 'active',
    commissionRate: 1.0,
    location: 'Madrid, España',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'MERCH-002',
    name: 'Cafetería Luna',
    category: 'Restauración',
    status: 'active',
    commissionRate: 2.5,
    location: 'Madrid, España',
    createdAt: '2024-02-01T12:00:00Z'
  },
  {
    id: 'MERCH-003',
    name: 'Tienda Tech Online',
    category: 'Tecnología',
    status: 'active',
    commissionRate: 1.5,
    createdAt: '2024-03-10T14:30:00Z'
  },
  {
    id: 'MERCH-004',
    name: 'Gasolinera Repsol',
    category: 'Transporte',
    status: 'active',
    commissionRate: 0.8,
    location: 'Barcelona, España',
    createdAt: '2024-01-20T08:00:00Z'
  }
];

// Mock data para categorías
const mockCategories: PaymentCategory[] = [
  {
    id: 'CAT-001',
    name: 'Alimentación',
    description: 'Compras de alimentos y bebidas',
    icon: '🍎',
    color: '#4CAF50',
    status: 'active'
  },
  {
    id: 'CAT-002',
    name: 'Restauración',
    description: 'Restaurantes, cafeterías y bares',
    icon: '🍽️',
    color: '#FF9800',
    status: 'active'
  },
  {
    id: 'CAT-003',
    name: 'Tecnología',
    description: 'Productos tecnológicos y electrónicos',
    icon: '💻',
    color: '#2196F3',
    status: 'active'
  },
  {
    id: 'CAT-004',
    name: 'Transporte',
    description: 'Combustible, transporte público, taxis',
    icon: '🚗',
    color: '#9C27B0',
    status: 'active'
  }
];

/**
 * Servicio para gestión de pagos
 * Proporciona funciones para operaciones CRUD con datos mock
 */

/**
 * Obtiene todos los pagos con filtros opcionales
 */
export const getAllPayments = async (filters?: PaymentFilters): Promise<Payment[]> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 700));
  
  let filteredPayments = [...mockPayments];
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredPayments = filteredPayments.filter(payment =>
      payment.description.toLowerCase().includes(searchLower) ||
      payment.reference.toLowerCase().includes(searchLower) ||
      payment.clientName?.toLowerCase().includes(searchLower) ||
      payment.merchantName?.toLowerCase().includes(searchLower) ||
      payment.id.includes(searchLower)
    );
  }
  
  if (filters?.status) {
    filteredPayments = filteredPayments.filter(payment => payment.status === filters.status);
  }
  
  if (filters?.paymentMethod) {
    filteredPayments = filteredPayments.filter(payment => payment.paymentMethod === filters.paymentMethod);
  }
  
  if (filters?.currency) {
    filteredPayments = filteredPayments.filter(payment => payment.currency === filters.currency);
  }
  
  if (filters?.clientId) {
    filteredPayments = filteredPayments.filter(payment => payment.clientId === filters.clientId);
  }
  
  if (filters?.merchantId) {
    filteredPayments = filteredPayments.filter(payment => payment.merchantId === filters.merchantId);
  }
  
  if (filters?.categoryId) {
    filteredPayments = filteredPayments.filter(payment => payment.categoryId === filters.categoryId);
  }
  
  if (filters?.minAmount !== undefined) {
    filteredPayments = filteredPayments.filter(payment => payment.amount >= filters.minAmount!);
  }
  
  if (filters?.maxAmount !== undefined) {
    filteredPayments = filteredPayments.filter(payment => payment.amount <= filters.maxAmount!);
  }
  
  if (filters?.dateFrom) {
    const dateFrom = new Date(filters.dateFrom);
    filteredPayments = filteredPayments.filter(payment => 
      new Date(payment.createdAt) >= dateFrom
    );
  }
  
  if (filters?.dateTo) {
    const dateTo = new Date(filters.dateTo);
    filteredPayments = filteredPayments.filter(payment => 
      new Date(payment.createdAt) <= dateTo
    );
  }
  
  // Ordenar por fecha de creación (más recientes primero)
  return filteredPayments.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Obtiene un pago por ID
 */
export const getPaymentById = async (id: string): Promise<Payment> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const payment = mockPayments.find(payment => payment.id === id);
  if (!payment) {
    throw new Error('Pago no encontrado');
  }
  
  return payment;
};

/**
 * Crea un nuevo pago
 */
export const createPayment = async (paymentData: CreatePaymentData): Promise<Payment> => {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Generar referencia única
  const reference = `PAY-${new Date().getFullYear()}-${String(mockPayments.length + 1).padStart(3, '0')}`;
  
  // Obtener información del comercio si existe
  const merchant = mockMerchants.find(m => m.id === paymentData.merchantId);
  const category = mockCategories.find(c => c.id === paymentData.categoryId);
  
  // Calcular comisiones si hay comercio
  let fees;
  if (merchant) {
    const feeAmount = (paymentData.amount * merchant.commissionRate) / 100;
    fees = {
      amount: feeAmount,
      type: 'percentage' as const,
      description: `Comisión comercio ${merchant.commissionRate}%`
    };
  }
  
  const newPayment: Payment = {
    ...paymentData,
    id: (mockPayments.length + 1).toString(),
    status: 'pending',
    reference,
    merchantName: merchant?.name,
    categoryName: category?.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fees,
  };
  
  mockPayments.unshift(newPayment); // Agregar al inicio para que sea el más reciente
  return newPayment;
};

/**
 * Actualiza un pago existente
 */
export const updatePayment = async (id: string, paymentData: UpdatePaymentData): Promise<Payment> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const paymentIndex = mockPayments.findIndex(payment => payment.id === id);
  if (paymentIndex === -1) {
    throw new Error('Pago no encontrado');
  }
  
  // Limpiar datos vacíos
  const cleanData: Partial<UpdatePaymentData> = {};
  Object.entries(paymentData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanData[key as keyof UpdatePaymentData] = value;
    }
  });
  
  // Si se está completando el pago, agregar fecha de procesamiento
  if (cleanData.status === 'completed' && mockPayments[paymentIndex].status !== 'completed') {
    mockPayments[paymentIndex].processedAt = new Date().toISOString();
  }
  
  mockPayments[paymentIndex] = {
    ...mockPayments[paymentIndex],
    ...cleanData,
    updatedAt: new Date().toISOString(),
  };
  
  return mockPayments[paymentIndex];
};

/**
 * Cancela un pago (solo si está pendiente)
 */
export const cancelPayment = async (id: string): Promise<Payment> => {
  const payment = await getPaymentById(id);
  
  if (payment.status !== 'pending') {
    throw new Error('Solo se pueden cancelar pagos pendientes');
  }
  
  return updatePayment(id, { status: 'cancelled' });
};

/**
 * Procesa un pago pendiente
 */
export const processPayment = async (id: string): Promise<Payment> => {
  const payment = await getPaymentById(id);
  
  if (payment.status !== 'pending') {
    throw new Error('Solo se pueden procesar pagos pendientes');
  }
  
  // Simular procesamiento que puede fallar ocasionalmente
  const shouldFail = Math.random() < 0.15; // 15% de probabilidad de fallo
  
  if (shouldFail) {
    const errorMessages = [
      'Saldo insuficiente en la cuenta',
      'Tarjeta rechazada por el banco emisor',
      'Error de conexión con el procesador de pagos',
      'Límite de transacciones excedido',
    ];
    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    
    return updatePayment(id, { 
      status: 'failed',
      errorMessage: randomError
    });
  }
  
  return updatePayment(id, { status: 'completed' });
};

/**
 * Reembolsa un pago completado
 */
export const refundPayment = async (id: string): Promise<Payment> => {
  const payment = await getPaymentById(id);
  
  if (payment.status !== 'completed') {
    throw new Error('Solo se pueden reembolsar pagos completados');
  }
  
  return updatePayment(id, { status: 'refunded' });
};

/**
 * Busca pagos (alias para getAllPayments con filtros)
 */
export const searchPayments = async (filters: PaymentFilters): Promise<Payment[]> => {
  return getAllPayments(filters);
};

/**
 * Obtiene pagos paginados
 */
export const getPaymentsPaginated = async (filters: PaymentFilters = {}): Promise<{
  payments: Payment[];
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
  
  const allPayments = await getAllPayments(filters);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedPayments = allPayments.slice(startIndex, endIndex);
  
  return {
    payments: paginatedPayments,
    pagination: {
      current_page: page,
      last_page: Math.ceil(allPayments.length / perPage),
      per_page: perPage,
      total: allPayments.length,
      from: startIndex + 1,
      to: Math.min(endIndex, allPayments.length),
    }
  };
};

/**
 * Obtiene estadísticas de pagos
 */
export const getPaymentStats = async (filters?: Omit<PaymentFilters, 'page' | 'per_page'>): Promise<PaymentStats> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const payments = await getAllPayments(filters);
  
  const paymentsByMethod = payments.reduce((acc, payment) => {
    acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const paymentsByStatus = payments.reduce((acc, payment) => {
    acc[payment.status] = (acc[payment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalFees = payments.reduce((sum, payment) => sum + (payment.fees?.amount || 0), 0);
  
  return {
    totalPayments: payments.length,
    totalAmount,
    paymentsByMethod,
    paymentsByStatus,
    averageAmount: payments.length > 0 ? totalAmount / payments.length : 0,
    totalFees,
  };
};

/**
 * Obtiene todos los comercios
 */
export const getAllMerchants = async (): Promise<Merchant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockMerchants];
};

/**
 * Obtiene todas las categorías de pago
 */
export const getAllCategories = async (): Promise<PaymentCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCategories];
};

// Exportación del servicio completo para uso externo
const PaymentsService = {
  // Operaciones CRUD principales
  getAll: getAllPayments,
  getAllPayments,
  getPaginated: getPaymentsPaginated,
  getPaymentsPaginated,
  getById: getPaymentById,
  getPaymentById,
  create: createPayment,
  createPayment,
  update: updatePayment,
  updatePayment,
  search: searchPayments,
  searchPayments,

  // Operaciones específicas
  cancel: cancelPayment,
  cancelPayment,
  process: processPayment,
  processPayment,
  refund: refundPayment,
  refundPayment,
  getStats: getPaymentStats,
  getPaymentStats,

  // Datos relacionados
  getMerchants: getAllMerchants,
  getAllMerchants,
  getCategories: getAllCategories,
  getAllCategories,
};

export default PaymentsService;
