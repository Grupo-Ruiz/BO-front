export * from './types';

// Services
export * from './services/ClientService';
export { default as ClientsApiService } from './services/ClientsApiService';
export * from './services/ClientsApiService';

// Hooks
export * from './hooks/useClients';
export { useClientActions } from './hooks/useClientActions';

// Providers
export { ClientProvider, useClientContext } from './providers/ClientProvider';

// Routes
export { ClientRoutes, ClientsPage } from './routes';
