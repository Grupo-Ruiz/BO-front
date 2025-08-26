import type { LoginFormProps } from '../types/index';
import { useLoginForm } from '../hooks/useLoginForm';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineUser, HiOutlineLockClosed, HiOutlineBuildingOffice } from 'react-icons/hi2';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getDelegations } from '@/modules/shared/store/thunks/delegationsThunks';
import type { RootState } from '@/store';

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  // Hook para manejar el formulario de login
  const {
    credentials,
    setCredentials,
    showPassword,
    setShowPassword,
    error,
    setError,
    // isSubmitting,
    handleChange,
    handleSubmit,
  } = useLoginForm({ onSubmit });

  const dispatch = useAppDispatch();
  const { delegations } = useAppSelector((state: RootState) => state.delegations);
  // Obtener las delegaciones al montar el componente
  useEffect(() => {
    dispatch(getDelegations());
  }, []);

  return (
    <div className="max-w-md w-full space-y-8 p-6 sm:p-8">
      <div>
        <div className="mx-auto h-40 w-40 flex items-center justify-center">
          <img 
            src="/logo.webp" 
            alt="Yurni Logo" 
            className="h-40 w-40 object-contain rounded-full"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Yurni Backoffice
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Inicia sesión para acceder al panel de administración
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">

          {/* Correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <HiOutlineUser className="h-5 w-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={handleChange('email')}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <HiOutlineLockClosed className="h-5 w-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={credentials.password}
                onChange={handleChange('password')}
                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Selector de empresa */}
          <div>
            <label htmlFor="delegacion_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Empresa
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <HiOutlineBuildingOffice className="h-5 w-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
              </div>
              <select
                id="delegacion_id"
                name="delegacion_id"
                required
                value={credentials.delegacion_id ?? ""}
                onChange={handleChange('delegacion_id')}
                className="appearance-none relative block w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
              >
                <option value="">Selecciona una empresa</option>
                {delegations.map((delegation) => (
                  <option key={delegation.id} value={delegation.id}>
                    {delegation.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        )}

        <div>
          {/* Hacer el login */}
          <button
            type="submit"
            disabled={isLoading /* || isSubmitting */}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 transition-colors shadow-sm"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </div>

        {/* Demo credentials helper */}
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => {
              setCredentials({ email: 'admin@yurni.com', password: '123456', delegacion_id: 7 });
              setError('');
            }}
            className="block w-full text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 py-1"
          >
            🔑 Usar credenciales de Administrador
          </button>
          <button
            type="button"
            onClick={() => {
              setCredentials({ email: 'operador@yurni.com', password: '123456', delegacion_id: 9 });
              setError('');
            }}
            className="block w-full text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 py-1"
          >
            👤 Usar credenciales de Operador
          </button>
        </div>
      </form>
    </div>
  );
}