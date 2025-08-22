import { HiOutlineBell, HiOutlineUserCircle, HiOutlineArrowRightOnRectangle, HiOutlineBars3 } from 'react-icons/hi2';
import ThemeToggle from './ThemeToggle';
import { useHeader } from '../hooks/useHeader';
import type { HeaderProps } from '../types';

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const {
    user,
    handleLogout,
    handleProfileClick,
    handleSidebarToggle,
    sidebarOpen: sidebarOpenProp,
    setSidebarOpen: setSidebarOpenProp,
  } = useHeader({ sidebarOpen, setSidebarOpen });

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
      {/* Botón hamburguesa para móvil/tablet - Mejorado */}
      {setSidebarOpenProp && (
        <button
          type="button"
          className="relative -m-2.5 p-2.5 text-gray-500 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 group"
          onClick={handleSidebarToggle}
          aria-label={sidebarOpenProp ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          title={sidebarOpenProp ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative">
            <HiOutlineBars3 
              className={`h-6 w-6 transition-all duration-200 ${
                sidebarOpenProp ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`} 
              aria-hidden="true" 
            />
            <span className="absolute inset-0 rounded-md bg-primary-100 dark:bg-primary-900 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
          </div>
          
          {/* Indicador visual cuando está activo */}
          {sidebarOpenProp && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary-500 rounded-full animate-pulse"></span>
          )}
        </button>
      )}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Logo y título: siempre visible en móvil/tablet, solo visible en desktop cuando el sidebar está cerrado */}
        <div className={`flex flex-1 items-center transition-opacity duration-200`}>
          <img 
            src="/logo.webp" 
            alt="Yurni Logo" 
            className="h-8 w-8 mr-3 object-contain rounded-full lg:hidden"
          />
            <h2 className="text-lg font-bold leading-6 text-gray-900 dark:text-white lg:hidden">
            <span>Yurni</span>
            </h2>
        </div>

        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Ver notificaciones"
            title="Ver notificaciones"
          >
            <HiOutlineBell className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-600" aria-hidden="true" />

          {/* Profile info */}
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Ver perfil de usuario"
              title="Ver perfil"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <HiOutlineUserCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </div>
              <div className="hidden sm:flex sm:flex-col text-left">
                <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {user?.nombre || 'Usuario'}
                </span>
              </div>
            </button>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}