// Tipos usados en el módulo wallet

export interface CardInfo {
  id: string;
  userId: string;
  userName: string;
  cardNumber: string;
  balance: number;
  type: 'mensual' | 'sencillo' | 'anual';
  status: 'active' | 'inactive' | 'blocked';
  expiryDate: string;
  lastUsed: string;
}

export interface WalletQR {
  ticketNumber: string;
  equipmentType: number;
  equipmentCode: number;
  keyIndex: number;
  qrVersion: number;
  startValidity: string;
  endValidity: string;
  lineCode: number;
  titleCode: number;
  fareCode: number;
  stopType: number;
  originCode: number;
  destinationCode: number;
  rawCode: string;
}

export interface WalletTransaction {
  id: string;
  clientId: string;
  clientName: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';
  amount: number;
  currency: 'EUR' | 'USD';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  reference: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
  updatedAt: string;
  processedAt: string;
  relatedTransactionId?: string;
  metadata?: Record<string, any>;
}

export interface WalletTransactionFilters {
  search?: string;
  type?: WalletTransaction['type'];
  status?: WalletTransaction['status'];
  currency?: WalletTransaction['currency'];
  clientId?: string;
  minAmount?: number;
  maxAmount?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  per_page?: number;
}

export interface WalletBalance {
  clientId: string;
  currency: 'EUR' | 'USD';
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  lastUpdated: string;
}

export interface CreateWalletTransactionData {
  clientId: string;
  type: WalletTransaction['type'];
  amount: number;
  currency: 'EUR' | 'USD';
  description: string;
  relatedTransactionId?: string;
  metadata?: Record<string, any>;
}

export interface TransferData {
  fromClientId: string;
  toClientId: string;
  amount: number;
  currency: 'EUR' | 'USD';
  description: string;
  metadata?: Record<string, any>;
}

export interface WalletStats {
  totalTransactions: number;
  totalVolume: number;
  transactionsByType: Record<string, number>;
  transactionsByStatus: Record<string, number>;
  averageTransaction: number;
  totalDeposits: number;
  totalWithdrawals: number;
  netFlow: number;
}

export type OperationType = 'all' | 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'payment' | 'refund' | 'fee';


export interface TabConfig {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export type TabType = TabConfig['id'];

export interface WalletTabsProps {
  tabs: TabConfig[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface WalletState {
  transactions: WalletTransaction[];
  balances: WalletBalance[];
  cards: CardInfo[];
  qr?: WalletQR;
  isLoading: boolean;
  error?: string | null;
}
