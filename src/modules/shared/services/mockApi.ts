import type { WalletOperation, Payment, Operation, SAEOperation, FAQ, KPI } from "../types";

const generateMockWalletOperations = (): WalletOperation[] => {
  return [
    {
      id: '1',
      userId: '1',
      userName: 'María García',
      type: 'recharge',
      amount: 20.00,
      date: '2024-02-15',
      timestamp: '2024-02-15T10:30:00Z'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Juan López',
      type: 'payment',
      amount: -2.50,
      date: '2024-02-15',
      timestamp: '2024-02-15T11:15:00Z'
    },
    {
      id: '3',
      userId: '4',
      userName: 'Carlos Rodríguez',
      type: 'recharge',
      amount: 50.00,
      date: '2024-02-15',
      timestamp: '2024-02-15T09:20:00Z'
    }
  ];
};

const generateMockPayments = (): Payment[] => {
  return [
    {
      id: '1',
      userId: '1',
      userName: 'María García',
      amount: 20.00,
      method: 'card',
      date: '2024-02-15',
      status: 'completed',
      reference: 'PAY-001-2024'
    },
    {
      id: '2',
      userId: '4',
      userName: 'Carlos Rodríguez',
      amount: 50.00,
      method: 'transfer',
      date: '2024-02-15',
      status: 'completed',
      reference: 'PAY-002-2024'
    },
    {
      id: '3',
      userId: '2',
      userName: 'Juan López',
      amount: 15.00,
      method: 'card',
      date: '2024-02-14',
      status: 'pending',
      reference: 'PAY-003-2024'
    }
  ];
};

const generateMockOperations = (): Operation[] => {
  return [
    {
      id: '1',
      userId: '1',
      userName: 'María García',
      description: 'Compra billete sencillo - Línea 1',
      date: '2024-02-15',
      status: 'completed'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Juan López',
      description: 'Recarga abono mensual',
      date: '2024-02-15',
      status: 'completed'
    },
    {
      id: '3',
      userId: '4',
      userName: 'Carlos Rodríguez',
      description: 'Validación QR - Estación Central',
      date: '2024-02-15',
      status: 'completed'
    }
  ];
};

const generateMockSAEOperations = (): SAEOperation[] => {
  return [
    {
      id: '1',
      operationType: 'Recarga',
      date: '2024-02-15',
      userId: '1',
      userName: 'María García',
      type: 'subscription_recharge',
      description: 'Recarga abono mensual',
      amount: 35.00,
      timestamp: '2024-02-15T10:30:00Z',
      status: 'completed',
      saeReference: 'SAE-SUB-001'
    },
    {
      id: '2',
      operationType: 'Boleto',
      date: '2024-02-15',
      userId: '2',
      userName: 'Juan López',
      type: 'single_ticket',
      description: 'Billete sencillo - Zona 1',
      amount: 2.50,
      timestamp: '2024-02-15T11:15:00Z',
      status: 'completed',
      saeReference: 'SAE-TIC-002'
    },
    {
      id: '3',
      operationType: 'QR',
      date: '2024-02-15',
      userId: '4',
      userName: 'Carlos Rodríguez',
      type: 'qr_generation',
      description: 'Generación QR acceso',
      amount: 0.00,
      timestamp: '2024-02-15T09:20:00Z',
      status: 'completed',
      saeReference: 'SAE-QR-003'
    }
  ];
};

const generateMockFAQs = (): FAQ[] => {
  return [
    {
      id: '1',
      question: '¿Cómo puedo recargar mi monedero?',
      answer: 'Puedes recargar tu monedero desde la app usando tarjeta de crédito/débito o transferencia bancaria. Ve a la sección "Monedero" y selecciona "Recargar".',
      category: 'Monedero',
      order: 1,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    },
    {
      id: '2',
      question: '¿Cómo compro un billete sencillo?',
      answer: 'Para comprar un billete sencillo, ve a "Billetes" en el menú principal, selecciona tu origen y destino, y confirma la compra. El billete se guardará en tu app.',
      category: 'Billetes',
      order: 2,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    },
    {
      id: '3',
      question: '¿Qué es el código QR y cómo lo uso?',
      answer: 'El código QR es tu billete digital. Al comprarlo, aparecerá en tu app. Solo muéstralo al validador en la estación para acceder al transporte.',
      category: 'QR',
      order: 3,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    }
  ];
};

const generateMockKPIs = (): KPI[] => {
  return [
    {
      id: '1',
      name: 'Usuarios Activos',
      value: 15420,
      previousValue: 14890,
      change: 3.6,
      changeType: 'increase',
      period: 'Este mes'
    },
    {
      id: '2',
      name: 'Transacciones Diarias',
      value: 2847,
      previousValue: 3120,
      change: -8.7,
      changeType: 'decrease',
      period: 'Hoy'
    },
    {
      id: '3',
      name: 'Ingresos Mensuales',
      value: 45620,
      previousValue: 42380,
      change: 7.6,
      changeType: 'increase',
      period: 'Este mes'
    },
    {
      id: '4',
      name: 'Tickets Vendidos',
      value: 8934,
      previousValue: 8521,
      change: 4.8,
      changeType: 'increase',
      period: 'Esta semana'
    }
  ];
};

// Mock API services
export class MockAPIService {
  // Wallet Operations
  static async getWalletOperations(): Promise<WalletOperation[]> {
    await this.delay(500);
    return generateMockWalletOperations();
  }

  static async createWalletOperation(operation: Omit<WalletOperation, 'id' | 'timestamp'>): Promise<WalletOperation> {
    await this.delay(500);
    const newOperation: WalletOperation = {
      ...operation,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    return newOperation;
  }

  // Payments
  static async getPayments(): Promise<Payment[]> {
    await this.delay(500);
    return generateMockPayments();
  }

  // Operations
  static async getOperations(): Promise<Operation[]> {
    await this.delay(500);
    return generateMockOperations();
  }

  // SAE Operations
  static async getSAEOperations(): Promise<SAEOperation[]> {
    await this.delay(500);
    return generateMockSAEOperations();
  }

  static async createSAEOperation(operation: Omit<SAEOperation, 'id' | 'timestamp'>): Promise<SAEOperation> {
    await this.delay(500);
    const newOperation: SAEOperation = {
      ...operation,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    return newOperation;
  }

  // FAQs
  static async getFAQs(): Promise<FAQ[]> {
    await this.delay(500);
    return generateMockFAQs();
  }

  static async updateFAQ(id: string, faqData: Partial<FAQ>): Promise<FAQ> {
    await this.delay(500);
    const faqs = generateMockFAQs();
    const faqIndex = faqs.findIndex(faq => faq.id === id);
    if (faqIndex !== -1) {
      faqs[faqIndex] = { ...faqs[faqIndex], ...faqData, updatedAt: new Date().toISOString() };
      return faqs[faqIndex];
    }
    throw new Error('FAQ not found');
  }

  static async createFAQ(faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    await this.delay(500);
    const newFAQ: FAQ = {
      ...faqData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newFAQ;
  }

  static async deleteFAQ(id: string): Promise<void> {
    await this.delay(500);
    // Mock deletion - in real implementation, would delete FAQ with this id
    console.log(`Deleting FAQ with id: ${id}`);
  }

  // KPIs
  static async getKPIs(): Promise<KPI[]> {
    await this.delay(500);
    return generateMockKPIs();
  }

  // Utility method to simulate network delay
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}