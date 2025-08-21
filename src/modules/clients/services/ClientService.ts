
import type { Client, CreateClientData, UpdateClientData, ClientFilters } from '../types';

// Mock data para clientes
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ana García López',
    email: 'ana.garcia@email.com',
    phone: '+34 666 123 456',
    status: 'active',
    userType: 'premium',
    walletBalance: 1250.75,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-08-01T15:45:00Z',
    documentType: 'DNI',
    documentNumber: '12345678A',
    address: 'Calle Mayor 123, 4º B',
    city: 'Madrid',
    country: 'España',
    birthDate: '1990-05-15',
    kycStatus: 'verified',
    riskLevel: 'low',
    totalTransactions: 47,
    lastTransactionDate: '2024-08-01T15:45:00Z'
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    email: 'carlos.martinez@email.com',
    phone: '+34 677 987 654',
    status: 'active',
    userType: 'regular',
    walletBalance: 340.20,
    createdAt: '2024-02-20T14:20:00Z',
    updatedAt: '2024-07-30T12:15:00Z',
    documentType: 'DNI',
    documentNumber: '87654321B',
    address: 'Avenida de la Libertad 45, 2º A',
    city: 'Barcelona',
    country: 'España',
    birthDate: '1985-11-22',
    kycStatus: 'verified',
    riskLevel: 'low',
    totalTransactions: 23,
    lastTransactionDate: '2024-07-30T12:15:00Z'
  },
  {
    id: '3',
    name: 'María Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+34 655 444 333',
    status: 'suspended',
    userType: 'regular',
    walletBalance: 89.50,
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-07-25T16:30:00Z',
    documentType: 'Passport',
    documentNumber: 'AB123456789',
    city: 'Valencia',
    country: 'España',
    birthDate: '1992-08-08',
    kycStatus: 'pending',
    riskLevel: 'medium',
    totalTransactions: 8,
    lastTransactionDate: '2024-07-20T10:20:00Z'
  },
  {
    id: '4',
    name: 'David Johnson',
    email: 'david.johnson@email.com',
    phone: '+44 7911 123456',
    status: 'active',
    userType: 'premium',
    walletBalance: 2150.00,
    createdAt: '2024-01-25T11:45:00Z',
    updatedAt: '2024-08-02T14:20:00Z',
    documentType: 'Passport',
    documentNumber: 'UK987654321',
    address: '10 Downing Street',
    city: 'London',
    country: 'Reino Unido',
    birthDate: '1988-03-12',
    kycStatus: 'verified',
    riskLevel: 'low',
    totalTransactions: 89,
    lastTransactionDate: '2024-08-02T14:20:00Z'
  }
];

export class ClientService {
  static async getClients(filters?: ClientFilters): Promise<Client[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredClients = [...mockClients];
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredClients = filteredClients.filter(client =>
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone.includes(searchLower) ||
        client.documentNumber.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters?.status) {
      filteredClients = filteredClients.filter(client => client.status === filters.status);
    }
    
    if (filters?.userType) {
      filteredClients = filteredClients.filter(client => client.userType === filters.userType);
    }
    
    if (filters?.kycStatus) {
      filteredClients = filteredClients.filter(client => client.kycStatus === filters.kycStatus);
    }
    
    if (filters?.riskLevel) {
      filteredClients = filteredClients.filter(client => client.riskLevel === filters.riskLevel);
    }
    
    if (filters?.minBalance !== undefined) {
      filteredClients = filteredClients.filter(client => client.walletBalance >= filters.minBalance!);
    }
    
    if (filters?.maxBalance !== undefined) {
      filteredClients = filteredClients.filter(client => client.walletBalance <= filters.maxBalance!);
    }
    
    return filteredClients;
  }
  
  static async getClientById(id: string): Promise<Client | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockClients.find(client => client.id === id) || null;
  }
  
  static async createClient(data: CreateClientData): Promise<Client> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newClient: Client = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'active',
      userType: data.userType,
      walletBalance: data.initialBalance || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      address: data.address,
      city: data.city,
      country: data.country || 'España',
      birthDate: data.birthDate,
      kycStatus: 'pending',
      riskLevel: 'low',
      totalTransactions: 0
    };
    
    mockClients.push(newClient);
    return newClient;
  }
  
  static async updateClient(id: string, data: UpdateClientData): Promise<Client> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const clientIndex = mockClients.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    mockClients[clientIndex] = {
      ...mockClients[clientIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockClients[clientIndex];
  }
  
  static async deleteClient(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const clientIndex = mockClients.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    mockClients.splice(clientIndex, 1);
  }
  
  static async updateClientBalance(id: string, newBalance: number): Promise<Client> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const clientIndex = mockClients.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    mockClients[clientIndex].walletBalance = newBalance;
    mockClients[clientIndex].updatedAt = new Date().toISOString();
    
    return mockClients[clientIndex];
  }
  
  static async suspendClient(id: string): Promise<Client> {
    return this.updateClient(id, { status: 'suspended' });
  }
  
  static async activateClient(id: string): Promise<Client> {
    return this.updateClient(id, { status: 'active' });
  }
}
