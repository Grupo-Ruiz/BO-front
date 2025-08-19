// Servicio de usuarios ficticio para desarrollo sin API
import type { User, UserFilters, CreateUserData, UpdateUserData } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan',
    email: 'juan@email.com',
    role: 'admin',
    roleId: 1,
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Ana',
    email: 'ana@email.com',
    role: 'operator',
    roleId: 2,
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pedro',
    email: 'pedro@email.com',
    role: 'operator',
    roleId: 2,
    status: 'inactive',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

export const UserService = {
  async getUsers(filters?: UserFilters): Promise<User[]> {
    // Puedes filtrar aquí si lo necesitas
    return Promise.resolve(mockUsers);
  },
  async createUser(data: CreateUserData): Promise<User> {
    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      role: data.role_id === 1 ? 'admin' : 'operator',
      roleId: data.role_id,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
  },
  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const idx = mockUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      mockUsers[idx] = { ...mockUsers[idx], ...data };
      return Promise.resolve(mockUsers[idx]);
    }
    throw new Error('Usuario no encontrado');
  },
  async deleteUser(id: string): Promise<void> {
    const idx = mockUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      mockUsers.splice(idx, 1);
      return Promise.resolve();
    }
    throw new Error('Usuario no encontrado');
  },
};
