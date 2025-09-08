import * as ClientsService from '../services';
import type { Client, ClientsPaginatedResponse, ClientFilters, ClientsPaginationMeta } from '../types';

export const clientsApi = {
  getPaginated: async (filters: ClientFilters = {}): Promise<ClientsPaginatedResponse> => {
  const clients = await ClientsService.getClients();
    let filtered = clients;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
    }
    if (filters.status) filtered = filtered.filter(c => c.status === filters.status);
    if (filters.kycStatus) filtered = filtered.filter(c => c.kycStatus === filters.kycStatus);
    if (filters.riskLevel) filtered = filtered.filter(c => c.riskLevel === filters.riskLevel);

    const per_page = filters.per_page || 10;
    const page = filters.page || 1;
    const total = filtered.length;
    const pages = Math.ceil(total / per_page);
    const start = (page - 1) * per_page;
    const data = filtered.slice(start, start + per_page);
    const meta: ClientsPaginationMeta = { page, pages, per_page, total };
    return { data, meta };
  },
  create: async (client: Client): Promise<Client> => {
  return ClientsService.addClient(client);
  },
  update: async (id: string, client: Client): Promise<Client> => {
  return ClientsService.updateClient({ ...client, id });
  },
  delete: async (id: string): Promise<void> => {
  return ClientsService.deleteClient(id);
  },
};