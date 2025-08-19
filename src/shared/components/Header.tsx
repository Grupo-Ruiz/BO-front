import { BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ShieldCheckIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../../modules/auth';
import { useUserModal } from '../contexts/UserModalContext';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth();
  const { openModal } = useUserModal();

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    if (user) {
      // Convertir AuthUser a User para el modal
      const userForModal: import('../../modules/users/types').User = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: '', // El AuthUser no tiene phone, usar string vacío
        role: user.role,
        status: 'active', // Asumir activo para usuarios autenticados
        createdAt: new Date().toISOString(), // Valor por defecto
        updatedAt: new Date().toISOString(), // Valor por defecto
      };
      openModal('view', userForModal);
    }
  };

  const handleSidebarToggle = () => {
    if (setSidebarOpen) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
      {/* Botón hamburguesa para móvil/tablet - Mejorado */}
      {setSidebarOpen && (
        <button
          type="button"
          className="relative -m-2.5 p-2.5 text-gray-500 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 group"
          onClick={handleSidebarToggle}
          aria-label={sidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          title={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative">
            <Bars3Icon 
              className={`h-6 w-6 transition-all duration-200 ${
                sidebarOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`} 
              aria-hidden="true" 
            />
            <span className="absolute inset-0 rounded-md bg-primary-100 dark:bg-primary-900 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
          </div>
          
          {/* Indicador visual cuando está activo */}
          {sidebarOpen && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary-500 rounded-full animate-pulse"></span>
          )}
        </button>
      )}

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Logo y título: siempre visible en móvil/tablet, solo visible en desktop cuando el sidebar está cerrado */}
        <div className={`flex flex-1 items-center transition-opacity duration-200`}>
          <img 
            src="/logo.jpeg" 
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
            <BellIcon className="h-5 w-5" aria-hidden="true" />
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
                <UserCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </div>
              <div className="hidden sm:flex sm:flex-col text-left">
                <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {user?.name || 'Usuario'}
                </span>
                {user && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                  }`}>
                    {user.role === 'admin' ? (
                      <>
                        <ShieldCheckIcon className="h-3 w-3 mr-1" />
                        Administrador
                      </>
                    ) : (
                      <>
                        <UserIcon className="h-3 w-3 mr-1" />
                        Operador
                      </>
                    )}
                  </span>
                )}
              </div>
            </button>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
