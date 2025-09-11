import type { Delegation } from "@/modules/delegations/types";

/**
 * Busca el nombre de una delegación por su id.
 * @param delegations Listado de delegaciones
 * @param id Id de la delegación
 * @returns El nombre de la delegación o '-' si no se encuentra
 */
export function getDelegationNameById(delegations: Delegation[], id: number): string {
  const found = delegations.find(d => d.id === id);
  return found ? found.nombre : '-';
}

export function getStatusBadge(activo: boolean) {
  const badgeClasses = activo
    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  return {
    text: activo ? 'Activo' : 'Inactivo',
    className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`,
  };
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}