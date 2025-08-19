// Components
export { UserModal } from './components/UserModal';
export { default as UsersApiExample } from './components/UsersApiExample';

// Hooks
export { useUsers } from './hooks/useUsers';
export { useUserActions } from './hooks/useUserActions';
export { useUsersApi } from './hooks/useUsersApi';

// Providers
export { UserProvider, useUserContext } from './providers/UserProvider';

// Services
export { UserService } from './services/UserService';

// Routes
export { UserRoutes, UsersPage } from './routes';

// Types
export type { 
  User, 
  CreateUserData, 
  UpdateUserData, 
  UserFilters,
  ApiUser,
  ApiRole,
  ApiHeadquarter,
  UsersResponse,
  UsersPaginatedResponse
} from './types';
