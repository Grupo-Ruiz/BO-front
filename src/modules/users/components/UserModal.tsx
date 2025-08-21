import { Modal, Button, Input } from '../../../shared/components';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { useUserModalLogic } from '../hooks/useUserModalLogic';
import type { UserModalProps } from '../types';

function UserModal(props: UserModalProps) {
  const {
    mode,
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    onClose,
    isOpen
  } = useUserModalLogic(props);

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
              label="Nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange('nombre')}
              error={errors.nombre}
              placeholder="Ej: Juan"
              icon={<HiOutlineUser className="h-4 w-4" />}
              required={mode !== 'view'}
              disabled={mode === 'view'}
            />
          </div>
          {/* Apellidos */}
          <div>
            <Input
              label="Apellidos"
              type="text"
              value={formData.apellidos}
              onChange={handleChange('apellidos')}
              error={errors.apellidos}
              placeholder="Ej: Pérez González"
              icon={<HiOutlineUser className="h-4 w-4" />}
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
              icon={<HiOutlineEnvelope className="h-4 w-4" />}
              required={mode !== 'view'}
              disabled={mode === 'view'}
            />
          </div>
          {/* Teléfono */}
          <div>
            <Input
              label="Teléfono (opcional)"
              type="tel"
              value={formData.telefono}
              onChange={handleChange('telefono')}
              error={errors.telefono}
              placeholder="+34 666 777 888"
              icon={<HiOutlinePhone className="h-4 w-4" />}
              disabled={mode === 'view'}
            />
          </div>
          {/* Estado (en modo edición y visualización) */}
          {(mode === 'edit' || mode === 'view') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado del usuario
              </label>
              <select
                value={formData.activo ? 'activo' : 'inactivo'}
                onChange={(e) => handleChange('activo')(e.target.value === 'activo' ? 'true' : 'false')}
                disabled={mode === 'view'}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                  mode === 'view'
                    ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed'
                    : ''
                }`}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Los usuarios inactivos no pueden acceder al sistema
              </p>
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

export { UserModal };
export default UserModal;