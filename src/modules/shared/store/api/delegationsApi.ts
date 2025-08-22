import { createApiClient } from "@/modules/shared/services/apiClient";
import type { Delegation, NewDelegation } from "../../types";

const BASE_MODULE = 'delegaciones';
const BASE_URL = `/${BASE_MODULE}`;
const delegationsApiClient = createApiClient('MAIN');

// API de Delegaciones
export const delegationsApi = {
  // Crear delegación
  create: async (delegationData: NewDelegation): Promise<Delegation> => {
    const response = await delegationsApiClient.post(`${BASE_URL}/`, delegationData);
    return response.data;
  },

  // Obtener todas las delegaciones
  all: async (): Promise<Delegation[]> => {
    const response = await delegationsApiClient.get(`${BASE_URL}/`);
    return response.data;
  }
};