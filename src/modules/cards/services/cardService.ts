import type { CardInfo } from "../types";

// Mock data de Tarjetas
export const mockCards: CardInfo[] = [
  { id: '1',  userId: 'user1',  userName: 'Juan Pérez',       cardNumber: '4532 1234 5678 1234', balance: 25.50,  type: 'mensual',  status: 'active',   expiryDate: '2025-12-31', lastUsed: '2024-08-04T10:30:00Z' },
  { id: '2',  userId: 'user2',  userName: 'María García',     cardNumber: '4532 5678 1234 5678', balance: 5.75,   type: 'sencillo', status: 'active',   expiryDate: '2025-06-30', lastUsed: '2024-08-03T15:45:00Z' },
  { id: '3',  userId: 'user3',  userName: 'Pedro López',      cardNumber: '5500 1122 3344 5566', balance: 12.00,  type: 'anual',    status: 'inactive', expiryDate: '2026-01-15', lastUsed: '2024-07-20T09:00:00Z' },
  { id: '4',  userId: 'user4',  userName: 'Lucía Torres',     cardNumber: '6011 2233 4455 6677', balance: 0.00,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-11-30', lastUsed: '2024-06-10T12:00:00Z' },
  { id: '5',  userId: 'user5',  userName: 'Carlos Ruiz',      cardNumber: '4539 8765 4321 8765', balance: 100.00, type: 'sencillo', status: 'active',   expiryDate: '2026-05-10', lastUsed: '2024-08-01T18:30:00Z' },
  { id: '6',  userId: 'user6',  userName: 'Ana Martínez',     cardNumber: '4916 2345 6789 2345', balance: 8.25,   type: 'mensual',  status: 'active',   expiryDate: '2025-09-22', lastUsed: '2024-07-15T14:20:00Z' },
  { id: '7',  userId: 'user7',  userName: 'Miguel Ángel',     cardNumber: '6011 9988 7766 5544', balance: 50.00,  type: 'anual',    status: 'inactive', expiryDate: '2027-03-01', lastUsed: '2024-05-30T11:10:00Z' },
  { id: '8',  userId: 'user8',  userName: 'Sofía Romero',     cardNumber: '4532 1111 2222 3333', balance: 2.50,   type: 'sencillo', status: 'active',   expiryDate: '2025-02-28', lastUsed: '2024-08-02T08:00:00Z' },
  { id: '9',  userId: 'user9',  userName: 'David Fernández',  cardNumber: '5500 3333 4444 5555', balance: 0.99,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-10-10', lastUsed: '2024-04-18T16:00:00Z' },
  { id: '10', userId: 'user10', userName: 'Elena Sánchez',    cardNumber: '6011 5555 6666 7777', balance: 15.00,  type: 'anual',    status: 'active',   expiryDate: '2026-12-12', lastUsed: '2024-08-05T19:45:00Z' },
  { id: '11', userId: 'user11', userName: 'Javier Gómez',     cardNumber: '4532 4444 5555 6666', balance: 7.80,   type: 'mensual',  status: 'inactive', expiryDate: '2025-07-07', lastUsed: '2024-07-25T10:10:00Z' },
  { id: '12', userId: 'user12', userName: 'Patricia Castro',  cardNumber: '4916 7777 8888 9999', balance: 30.00,  type: 'sencillo', status: 'active',   expiryDate: '2025-03-03', lastUsed: '2024-08-06T13:30:00Z' },
  { id: '13', userId: 'user13', userName: 'Raúl Navarro',     cardNumber: '5500 1212 3434 5656', balance: 0.00,   type: 'anual',    status: 'blocked',  expiryDate: '2024-09-09', lastUsed: '2024-03-12T09:00:00Z' },
  { id: '14', userId: 'user14', userName: 'Marta Gil',        cardNumber: '6011 2323 4545 6767', balance: 60.00,  type: 'mensual',  status: 'active',   expiryDate: '2026-08-08', lastUsed: '2024-08-07T17:00:00Z' },
  { id: '15', userId: 'user15', userName: 'Alberto Ramos',    cardNumber: '4532 5656 7878 9090', balance: 12.34,  type: 'sencillo', status: 'inactive', expiryDate: '2025-11-11', lastUsed: '2024-06-22T20:00:00Z' },
  { id: '16', userId: 'user16', userName: 'Cristina León',    cardNumber: '4916 3434 5656 7878', balance: 99.99,  type: 'anual',    status: 'active',   expiryDate: '2027-01-01', lastUsed: '2024-08-08T21:00:00Z' },
  { id: '17', userId: 'user17', userName: 'Sergio Ortega',    cardNumber: '6011 4545 6767 8989', balance: 3.21,   type: 'mensual',  status: 'blocked',  expiryDate: '2024-12-24', lastUsed: '2024-02-14T07:00:00Z' },
  { id: '18', userId: 'user18', userName: 'Beatriz Molina',   cardNumber: '5500 6767 8989 1010', balance: 45.67,  type: 'sencillo', status: 'active',   expiryDate: '2025-04-04', lastUsed: '2024-08-09T12:00:00Z' },
  { id: '19', userId: 'user19', userName: 'Rubén Herrera',    cardNumber: '4532 8989 1010 1212', balance: 0.50,   type: 'mensual',  status: 'inactive', expiryDate: '2025-10-10', lastUsed: '2024-05-05T15:00:00Z' },
  { id: '20', userId: 'user20', userName: 'Nuria Vargas',     cardNumber: '4916 1010 1212 1313', balance: 77.77,  type: 'anual',    status: 'active',   expiryDate: '2026-06-06', lastUsed: '2024-08-10T11:00:00Z' }
];

export const getAllCards = async (): Promise<CardInfo[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockCards];
};

export const getCardById = async (id: string): Promise<CardInfo | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockCards.find(card => card.id === id);
};