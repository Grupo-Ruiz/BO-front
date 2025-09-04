import type { Client } from '../types';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ana García López',
    email: 'ana.garcia@email.com',
    walletBalance: 1150.25,
    userType: 'premium',
    status: 'active',
    kycStatus: 'verified',
    riskLevel: 'low',
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    email: 'carlos.martinez@email.com',
    walletBalance: 390.20,
    userType: 'regular',
    status: 'suspended',
    kycStatus: 'pending',
    riskLevel: 'medium',
  },
  {
    id: '3',
    name: 'Lucía Torres',
    email: 'lucia.torres@email.com',
    walletBalance: 0,
    userType: 'regular',
    status: 'inactive',
    kycStatus: 'rejected',
    riskLevel: 'high',
  },
];

export const getClients = async (): Promise<Client[]> => {
  await new Promise(res => setTimeout(res, 400));
  return [...mockClients];
};

export const addClient = async (client: Client): Promise<Client> => {
  await new Promise(res => setTimeout(res, 300));
  mockClients.push(client);
  return client;
};

export const updateClient = async (client: Client): Promise<Client> => {
  await new Promise(res => setTimeout(res, 300));
  const idx = mockClients.findIndex(c => c.id === client.id);
  if (idx !== -1) mockClients[idx] = client;
  return client;
};

export const deleteClient = async (id: string): Promise<void> => {
  await new Promise(res => setTimeout(res, 200));
  const idx = mockClients.findIndex(c => c.id === id);
  if (idx !== -1) mockClients.splice(idx, 1);
};
