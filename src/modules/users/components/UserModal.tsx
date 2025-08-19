import { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../../../shared/components';
import type { User } from '../types';
import { UserIcon, EnvelopeIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  user?: User | null;
  mode: 'create' | 'edit' | 'view';
}

export function UserModal({ isOpen, onClose, onSave, user, mode }: UserModalProps) {
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'operator' as const,
    status: user?.status || 'active' as const
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Actualizar formData cuando cambie el usuario o se abra el modal
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'operator',
        status: user.status || 'active'
      });
      setErrors({}); // Limpiar errores al abrir
    } else if (isOpen && mode === 'create') {
      // Resetear formulario para modo crear
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'operator',
        status: 'active'
      });
      setErrors({});
    }
  }, [isOpen, user, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.role) {
      newErrors.role = 'El rol es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (mode === 'create') {
        // En un caso real, esto se haría a través del hook useUsers
        console.log('Crear usuario:', formData);
      } else if (user) {
        // En un caso real, esto se haría a través del hook useUsers
        console.log('Actualizar usuario:', { id: user.id, ...formData });
      }
      
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'create' 
          ? 'Crear Usuario del Backoffice' 
          : mode === 'view' 
            ? 'Perfil de Usuario'
            : 'Editar Usuario del Backoffice'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Nombre */}
          <div>
            <Input
              label="Nombre completo "
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              error={errors.name}
              placeholder="Ej: Juan Pérez González"
              icon={<UserIcon className="h-4 w-4" />}
              required={mode !== 'view'}
              disabled={mode === 'view'}
            />
          </div>

          {/* Email */}
          <div>
            <Input
              label="Correo electrónico "
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="juan.perez@yurni.com"
              icon={<EnvelopeIcon className="h-4 w-4" />}
              required={mode !== 'view'}
              disabled={mode === 'view'}
            />
          </div>

          {/* Teléfono */}
          <div>
            <Input
              label="Teléfono (opcional)"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              placeholder="+34 666 777 888"
              icon={<PhoneIcon className="h-4 w-4" />}
              disabled={mode === 'view'}
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ShieldCheckIcon className="inline h-4 w-4 mr-1" />
              Rol del usuario
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role')(e.target.value)}
              disabled={mode === 'view'}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                mode === 'view' 
                  ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                  : ''
              } ${
                errors.role 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              required={mode !== 'view'}
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador - Acceso completo</option>
              <option value="operator">Operador - Acceso limitado</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Los administradores tienen acceso completo, los operadores tienen permisos limitados
            </p>
          </div>

          {/* Estado (en modo edición y visualización) */}
          {(mode === 'edit' || mode === 'view') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado del usuario
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status')(e.target.value)}
                disabled={mode === 'view'}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                  mode === 'view' 
                    ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                    : ''
                }`}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Los usuarios inactivos no pueden acceder al sistema
              </p>
            </div>
          )}
          {/* Empresa actual (solo visualización) */}

          {mode === 'view' && user?.company && (
            console.log('Empresa actual:', user?.company),

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Empresa actual
              </label>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-800 dark:text-white">
                {user.company.name}
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {mode === 'view' ? 'Cerrar' : 'Cancelar'}
          </Button>
          {mode !== 'view' && (
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
