import apiClient from '../../../shared/services/apiClient';

/**
 * Servicio para obtener información del usuario autenticado
 */
// TODO: Reemplazar este mock por la llamada real a la API cuando esté disponible
export const getCurrentUser = async () => {
  // Simulación temporal de usuario autenticado
  return {
    id: 1,
    name: 'Usuario Demo',
    email: 'demo@yurni.com',
    role_id: 1,
    sede_id: 1,
    companyId: 1
  };
  // Cuando la API esté lista, descomenta lo siguiente y elimina el mock:
  // try {
  //   const response = await apiClient.get('/user');
  //   return response.data;
  // } catch (error) {
  //   console.error('Error obteniendo usuario actual:', error);
  //   throw error;
  // }
};

/**
 * Servicio para validar si el token sigue siendo válido
 */
// TODO: Reemplazar este mock por la llamada real a la API cuando esté disponible
export const validateToken = async (): Promise<boolean> => {
  // Simulación temporal de validación de token
  return true;
  // Cuando la API esté lista, descomenta lo siguiente y elimina el mock:
  // try {
  //   const response = await apiClient.get('/validate-token');
  //   return response.data.success || false;
  // } catch (error) {
  //   console.error('Error validando token:', error);
  //   return false;
  // }
};

/**
 * Servicio para obtener las sedes disponibles
 */
// TODO: Reemplazar este mock por la llamada real a la API cuando esté disponible
export const getHeadquarters = async () => {
  // Simulación temporal de sedes
  return [
    { id: 1, nombre: 'Sede Central' },
    { id: 2, nombre: 'Sucursal Norte' }
  ];
  // Cuando la API esté lista, descomenta lo siguiente y elimina el mock:
  // try {
  //   const response = await apiClient.get('/sedes');
  //   return response.data;
  // } catch (error) {
  //   console.error('Error obteniendo sedes:', error);
  //   throw error;
  // }
};

export default {
  getCurrentUser,
  validateToken,
  getHeadquarters,
};
