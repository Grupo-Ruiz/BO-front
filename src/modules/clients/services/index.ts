import type { Client, ClientCreateData } from '../types';

const mockClients: Client[] = [
  { id: '1', name: 'Ana García López', email: 'ana.garcia@email.com', walletBalance: 1150.25, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '2', name: 'Carlos Martínez', email: 'carlos.martinez@email.com', walletBalance: 390.20, userType: 'regular', status: 'suspended', riskLevel: 'medium' },
  { id: '3', name: 'Lucía Torres', email: 'lucia.torres@email.com', walletBalance: 0, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '4', name: 'Pedro Sánchez', email: 'pedro.sanchez@email.com', walletBalance: 250.00, userType: 'premium', status: 'active', riskLevel: 'medium' },
  { id: '5', name: 'María Fernández', email: 'maria.fernandez@email.com', walletBalance: 800.50, userType: 'regular', status: 'active', riskLevel: 'low' },
  { id: '6', name: 'Juan Pérez', email: 'juan.perez@email.com', walletBalance: 120.00, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '7', name: 'Laura Gómez', email: 'laura.gomez@email.com', walletBalance: 950.75, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '8', name: 'Miguel Ruiz', email: 'miguel.ruiz@email.com', walletBalance: 60.00, userType: 'regular', status: 'suspended', riskLevel: 'medium' },
  { id: '9', name: 'Sofía Castro', email: 'sofia.castro@email.com', walletBalance: 500.00, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '10', name: 'Diego Romero', email: 'diego.romero@email.com', walletBalance: 0, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '11', name: 'Elena Navarro', email: 'elena.navarro@email.com', walletBalance: 300.00, userType: 'premium', status: 'active', riskLevel: 'medium' },
  { id: '12', name: 'Javier Ortega', email: 'javier.ortega@email.com', walletBalance: 700.00, userType: 'regular', status: 'active', riskLevel: 'low' },
  { id: '13', name: 'Patricia León', email: 'patricia.leon@email.com', walletBalance: 150.00, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '14', name: 'Andrés Molina', email: 'andres.molina@email.com', walletBalance: 400.00, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '15', name: 'Isabel Ramos', email: 'isabel.ramos@email.com', walletBalance: 50.00, userType: 'regular', status: 'suspended', riskLevel: 'medium' },
  { id: '16', name: 'David Herrera', email: 'david.herrera@email.com', walletBalance: 1000.00, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '17', name: 'Carmen Ruiz', email: 'carmen.ruiz@email.com', walletBalance: 200.00, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '18', name: 'Francisco Torres', email: 'francisco.torres@email.com', walletBalance: 350.00, userType: 'regular', status: 'active', riskLevel: 'medium' },
  { id: '19', name: 'Marta Delgado', email: 'marta.delgado@email.com', walletBalance: 600.00, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '20', name: 'Alberto Gil', email: 'alberto.gil@email.com', walletBalance: 0, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '21', name: 'Teresa Ramos', email: 'teresa.ramos@email.com', walletBalance: 800.00, userType: 'premium', status: 'active', riskLevel: 'medium' },
  { id: '22', name: 'Roberto Castro', email: 'roberto.castro@email.com', walletBalance: 120.00, userType: 'regular', status: 'active', riskLevel: 'low' },
  { id: '23', name: 'Beatriz Morales', email: 'beatriz.morales@email.com', walletBalance: 900.00, userType: 'regular', status: 'inactive', riskLevel: 'high' },
  { id: '24', name: 'Sergio López', email: 'sergio.lopez@email.com', walletBalance: 300.00, userType: 'premium', status: 'active', riskLevel: 'low' },
  { id: '25', name: 'Paula Jiménez', email: 'paula.jimenez@email.com', walletBalance: 450.00, userType: 'regular', status: 'suspended', riskLevel: 'medium' },
];

export const getClients = async (): Promise<Client[]> => {
  await new Promise(res => setTimeout(res, 400));
  return [...mockClients];
};

export const addClient = async (client: ClientCreateData): Promise<Client> => {
  await new Promise(res => setTimeout(res, 300));
  const newClient: Client = { ...client, id: Date.now().toString() };
  mockClients.push(newClient);
  return newClient;
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