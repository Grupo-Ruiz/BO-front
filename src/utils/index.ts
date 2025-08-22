import type { Delegation } from '../modules/shared/types';

/**
 * Busca el nombre de una delegación por su id.
 * @param delegations Listado de delegaciones
 * @param id Id de la delegación
 * @returns El nombre de la delegación o '-' si no se encuentra
 */
export function getDelegationNameById(delegations: Delegation[], id: number | string): string {
  const found = delegations.find(d => d.id === Number(id));
  return found ? found.nombre : '-';
}
export * from './userUtils';
