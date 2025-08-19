import type { ReactNode } from 'react';
import { UserProvider } from '../modules/users';
import { ClientProvider } from '../modules/clients';

interface ModuleProvidersProps {
  children: ReactNode;
}

/**
 * Componente que agrupa todos los providers de módulos
 * Cada módulo que use providers debe incluirse aquí
 */
export function ModuleProviders({ children }: ModuleProvidersProps) {
  return (
    <UserProvider>
      <ClientProvider>
        {children}
      </ClientProvider>
    </UserProvider>
  );
}
