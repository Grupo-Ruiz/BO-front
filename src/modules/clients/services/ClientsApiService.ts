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
    phone: '+34 655 456 789',
    status: 'suspended',
    userType: 'regular',
    walletBalance: 0,
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-07-25T16:30:00Z',
    documentType: 'DNI',
    documentNumber: '45678912C',
    address: 'Plaza España 7, 1º C',
    city: 'Valencia',
    country: 'España',
    birthDate: '1992-08-03',
    kycStatus: 'rejected',
    riskLevel: 'high',
    totalTransactions: 5,
    lastTransactionDate: '2024-07-25T16:30:00Z'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+44 20 1234 5678',
    status: 'active',
    userType: 'premium',
    walletBalance: 2890.45,
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-08-02T14:20:00Z',
    documentType: 'Passport',
    documentNumber: 'P123456789',
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

/**
 * Servicio para gestión de clientes
 * Proporciona funciones para operaciones CRUD con datos mock
 */

/**
 * Obtiene todos los clientes con filtros opcionales
 */
export const getAllClients = async (filters?: ClientFilters): Promise<Client[]> => {
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
};

/**
 * Obtiene un cliente por ID
 */
export const getClientById = async (id: string): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const client = mockClients.find(client => client.id === id);
  if (!client) {
    throw new Error('Cliente no encontrado');
  }
  
  return client;
};

/**
 * Crea un nuevo cliente
 */
export const createClient = async (clientData: CreateClientData): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Verificar email duplicado
  if (mockClients.some(client => client.email === clientData.email)) {
    throw new Error('Ya existe un cliente con este email');
  }
  
  // Verificar documento duplicado
  if (mockClients.some(client => client.documentNumber === clientData.documentNumber)) {
    throw new Error('Ya existe un cliente con este número de documento');
  }
  
  const newClient: Client = {
    ...clientData,
    id: (mockClients.length + 1).toString(),
    walletBalance: 0,
    status: 'active',
    userType: 'regular',
    kycStatus: 'pending',
    riskLevel: 'low',
    totalTransactions: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockClients.push(newClient);
  return newClient;
};

/**
 * Actualiza un cliente existente
 */
export const updateClient = async (id: string, clientData: UpdateClientData): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const clientIndex = mockClients.findIndex(client => client.id === id);
  if (clientIndex === -1) {
    throw new Error('Cliente no encontrado');
  }
  
  // Verificar email duplicado si se está cambiando
  if (clientData.email) {
    const existingClient = mockClients.find(client => 
      client.email === clientData.email && client.id !== id
    );
    if (existingClient) {
      throw new Error('Ya existe un cliente con este email');
    }
  }
  
  // Verificar documento duplicado si se está cambiando
  // Nota: documentNumber no está en UpdateClientData, solo se puede cambiar al crear
  
  // Limpiar datos vacíos
  const cleanData: Partial<UpdateClientData> = {};
  Object.entries(clientData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanData[key as keyof UpdateClientData] = value;
    }
  });
  
  mockClients[clientIndex] = {
    ...mockClients[clientIndex],
    ...cleanData,
    updatedAt: new Date().toISOString(),
  };
  
  return mockClients[clientIndex];
};

/**
 * Elimina un cliente
 */
export const deleteClient = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const clientIndex = mockClients.findIndex(client => client.id === id);
  if (clientIndex === -1) {
    throw new Error('Cliente no encontrado');
  }
  
  mockClients.splice(clientIndex, 1);
  return true;
};

/**
 * Busca clientes (alias para getAllClients con filtros)
 */
export const searchClients = async (filters: ClientFilters): Promise<Client[]> => {
  return getAllClients(filters);
};

/**
 * Actualiza el balance de un cliente
 */
export const updateClientBalance = async (id: string, newBalance: number): Promise<Client> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!id || id.trim() === '') {
    throw new Error('ID no válido');
  }
  
  const clientIndex = mockClients.findIndex(client => client.id === id);
  if (clientIndex === -1) {
    throw new Error('Cliente no encontrado');
  }
  
  mockClients[clientIndex].walletBalance = newBalance;
  mockClients[clientIndex].updatedAt = new Date().toISOString();
  
  return mockClients[clientIndex];
};

/**
 * Suspende un cliente
 */
export const suspendClient = async (id: string): Promise<Client> => {
  return updateClient(id, { status: 'suspended' });
};

/**
 * Activa un cliente
 */
export const activateClient = async (id: string): Promise<Client> => {
  return updateClient(id, { status: 'active' });
};

/**
 * Obtiene clientes paginados
 */
export const getClientsPaginated = async (filters: ClientFilters & { page?: number; per_page?: number } = {}): Promise<{
  clients: Client[];
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
  
  const allClients = await getAllClients(filters);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedClients = allClients.slice(startIndex, endIndex);
  
  return {
    clients: paginatedClients,
    pagination: {
      current_page: page,
      last_page: Math.ceil(allClients.length / perPage),
      per_page: perPage,
      total: allClients.length,
      from: startIndex + 1,
      to: Math.min(endIndex, allClients.length),
    }
  };
};

// Exportación del servicio completo para uso externo
const ClientsService = {
  // Operaciones CRUD principales
  getAll: getAllClients,
  getAllClients,
  getPaginated: getClientsPaginated,
  getClientsPaginated,
  getById: getClientById,
  getClientById,
  create: createClient,
  createClient,
  update: updateClient,
  updateClient,
  delete: deleteClient,
  deleteClient,
  search: searchClients,
  searchClients,

  // Operaciones específicas
  updateBalance: updateClientBalance,
  updateClientBalance,
  suspend: suspendClient,
  suspendClient,
  activate: activateClient,
  activateClient,
};

export default ClientsService;
