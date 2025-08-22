import { useState } from 'react';
import { Modal, Button, Input } from '@/modules/shared/components';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlinePhone, HiOutlineEye, HiOutlineEyeSlash, HiOutlineXMark, HiOutlinePencilSquare, HiOutlinePlusCircle } from 'react-icons/hi2';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              placeholder="Nombre del usuario"
              icon={<HiOutlineUser className="h-4 w-4" />}
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
              placeholder="Apellidos del usuario"
              icon={<HiOutlineUser className="h-4 w-4" />}
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
              placeholder="correo@yurni.com"
              icon={<HiOutlineEnvelope className="h-4 w-4" />}
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
              placeholder="+34666777888"
              icon={<HiOutlinePhone className="h-4 w-4" />}
              disabled={mode === 'view'}
              autoComplete="tel"
            />
          </div>

          {/* Password */}
          {(mode === 'edit' || mode === 'create')  && (
            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ''}
                onChange={handleChange('password')}
                error={errors.password}
                placeholder="Contraseña segura"
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setShowPassword((v) => !v)}
                style={{ background: 'none', border: 'none', padding: 0 }}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <HiOutlineEyeSlash className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
              </button>
            </div>
          )}

          {/* Confirmar Password */}
          {(mode === 'edit' || mode === 'create')  && (
            <div className="relative">
              <Input
                label="Confirmar contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword || ''}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                placeholder="Repite la contraseña"
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setShowConfirmPassword((v) => !v)}
                style={{ background: 'none', border: 'none', padding: 0 }}
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showConfirmPassword ? <HiOutlineEyeSlash className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
              </button>
            </div>
          )}

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
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-base"
          >
            <HiOutlineXMark className="h-5 w-5" />
            {mode === 'view' ? 'Cerrar' : 'Cancelar'}
          </Button>
          {mode !== 'view' && (
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-base"
            >
              {mode === 'create' ? (
                <>
                  <HiOutlinePlusCircle className="h-5 w-5" /> Crear Usuario
                </>
              ) : (
                <>
                  <HiOutlinePencilSquare className="h-5 w-5" /> Guardar Cambios
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export { UserModal };
export default UserModal;