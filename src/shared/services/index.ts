/**
 * Índice central de servicios de la aplicación
 * 
 * Este archivo permite importar todos los servicios desde un punto central,
 * facilitando su uso en cualquier parte de la aplicación.
 * 
 * Uso:
 * import { UsersApiService, ClientsApiService, OperationsService } from '@/shared/services';
 * 
 * O importar un servicio específico:
 * import { UsersApiService } from '@/modules/users';
 */

// Re-exportar servicios por módulo con paths corregidos
export { 
  UsersApiService,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersPaginated,
  searchUsers,
  getRoles,
  getHeadquarters,
  mapApiUserToUser 
} from '../../modules/users';

export { 
  ClientService,
  ClientsApiService,
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsPaginated,
  searchClients,
  updateClientBalance,
  suspendClient,
  activateClient 
} from '../../modules/clients';

export { 
  OperationsService,
  getAllOperations,
  getOperationById,
  createOperation,
  updateOperation,
  cancelOperation,
  processOperation,
  getOperationsPaginated,
  searchOperations,
  getOperationStats 
} from '../../modules/operations';

export { 
  PaymentsService,
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  cancelPayment,
  processPayment,
  refundPayment,
  getPaymentsPaginated,
  searchPayments,
  getPaymentStats,
  getAllMerchants,
  getAllCategories 
} from '../../modules/payments';

export { 
  WalletService,
  getAllWalletTransactions,
  getWalletTransactionById,
  createWalletTransaction,
  getWalletBalance,
  getAllWalletBalances,
  transferFunds,
  processDeposit,
  processWithdrawal,
  getWalletTransactionsPaginated,
  searchWalletTransactions,
  getWalletStats 
} from '../../modules/wallet';

// Exportar servicios base y utilidades
export { BaseService } from './BaseService';
export type { 
  CrudService, 
  PaginatedService, 
  ApiResponse, 
  ApiPaginatedResponse, 
  BaseFilters 
} from '../types/ServiceTypes';

/**
 * Objeto con todos los servicios agrupados por módulo
 * 
 * Uso:
 * import { Services } from '@/shared/services';
 * const users = await Services.users.getAll();
 * const clients = await Services.clients.getAll();
 */
export const Services = {
  users: UsersApiService,
  clients: ClientsApiService,
  operations: OperationsService,
  payments: PaymentsService,
  wallet: WalletService,
} as const;

export default Services;
