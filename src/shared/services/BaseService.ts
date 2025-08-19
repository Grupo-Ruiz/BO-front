/**
 * Clase base para todos los servicios de la aplicación
 * Proporciona funcionalidades comunes como manejo de errores,
 * validaciones y utilidades compartidas
 */
export abstract class BaseService {
  /**
   * Simula un delay de red para servicios mock
   */
  protected static async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Maneja errores comunes de los servicios
   */
  protected static handleError(error: any, context: string): never {
    console.error(`Error en ${context}:`, error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    if (error.response?.data?.errors) {
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join(', ');
      throw new Error(errorMessages);
    }
    
    if (error.message) {
      throw error;
    }
    
    throw new Error(`Error en ${context}`);
  }

  /**
   * Valida que un ID sea válido
   */
  protected static validateId(id: string | number): void {
    if (!id || (typeof id === 'string' && id.trim() === '')) {
      throw new Error('ID no válido');
    }
  }

  /**
   * Filtra propiedades undefined/null de un objeto
   */
  protected static cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleaned[key as keyof T] = value;
      }
    });
    
    return cleaned;
  }
}
