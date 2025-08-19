// Tipos para el módulo de pagos
export interface Payment {
  id: string;
  clientId: string;
  clientName?: string;
  amount: number;
  currency: 'EUR' | 'USD';
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  paymentMethod: 'card' | 'wallet' | 'bank_transfer' | 'cash';
  description: string;
  reference: string;
  merchantId?: string;
  merchantName?: string;
  categoryId?: string;
  categoryName?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  errorMessage?: string;
  fees?: {
    amount: number;
    type: 'fixed' | 'percentage';
    description: string;
  };
  metadata?: Record<string, any>;
}

export interface CreatePaymentData {
  clientId: string;
  amount: number;
  currency: 'EUR' | 'USD';
  paymentMethod: 'card' | 'wallet' | 'bank_transfer' | 'cash';
  description: string;
  merchantId?: string;
  categoryId?: string;
  location?: string;
  metadata?: Record<string, any>;
}

export interface UpdatePaymentData {
  status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  description?: string;
  errorMessage?: string;
  processedAt?: string;
  metadata?: Record<string, any>;
}

export interface PaymentFilters {
  search?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  paymentMethod?: 'card' | 'wallet' | 'bank_transfer' | 'cash';
  currency?: 'EUR' | 'USD';
  clientId?: string;
  merchantId?: string;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  per_page?: number;
}

export interface PaymentStats {
  totalPayments: number;
  totalAmount: number;
  paymentsByMethod: Record<string, number>;
  paymentsByStatus: Record<string, number>;
  averageAmount: number;
  totalFees: number;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  commissionRate: number;
  location?: string;
  createdAt: string;
}

export interface PaymentCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  status: 'active' | 'inactive';
}
