// Imports directos para el objeto Services
import { ClientsApiService } from '../../modules/clients';
import { OperationsService } from '../../modules/operations';
import { PaymentsService } from '../../modules/payments';
import { WalletService } from '../../modules/wallet';
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
  BaseFilters 
} from '../types';

export const Services = {
  clients: ClientsApiService,
  operations: OperationsService,
  payments: PaymentsService,
  wallet: WalletService,
} as const;

export default Services;
