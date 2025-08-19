export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  userType: 'regular' | 'premium';
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
  // Datos adicionales del cliente
  documentType: 'DNI' | 'Passport' | 'CE';
  documentNumber: string;
  address?: string;
  city?: string;
  country: string;
  birthDate?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  totalTransactions: number;
  lastTransactionDate?: string;
}

export interface ClientCard {
  id: string;
  clientId: string;
  cardNumber: string; // Solo últimos 4 dígitos
  cardType: 'debit' | 'credit' | 'prepaid';
  brand: 'visa' | 'mastercard' | 'amex';
  expiryDate: string;
  status: 'active' | 'blocked' | 'expired';
  isDefault: boolean;
  createdAt: string;
}

export interface ClientTransaction {
  id: string;
  clientId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  createdAt: string;
  updatedAt: string;
  cardId?: string;
  reference?: string;
}

export interface CreateClientData {
  name: string;
  email: string;
  phone: string;
  userType: 'regular' | 'premium';
  documentType: 'DNI' | 'Passport' | 'CE';
  documentNumber: string;
  address?: string;
  city?: string;
  country: string;
  birthDate?: string;
  initialBalance?: number;
}

export interface UpdateClientData {
  name?: string;
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'suspended';
  userType?: 'regular' | 'premium';
  address?: string;
  city?: string;
  country?: string;
  birthDate?: string;
}

export interface ClientFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'suspended';
  userType?: 'regular' | 'premium';
  kycStatus?: 'pending' | 'verified' | 'rejected';
  riskLevel?: 'low' | 'medium' | 'high';
  minBalance?: number;
  maxBalance?: number;
  dateFrom?: string;
  dateTo?: string;
}
