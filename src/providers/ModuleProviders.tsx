import type { ReactNode } from 'react';

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
    <ClientProvider>
      {children}
    </ClientProvider>
  );
}
