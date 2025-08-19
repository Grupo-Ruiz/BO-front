import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../modules/auth/services/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Empleados', href: '/users', icon: UsersIcon },
  { name: 'Clientes', href: '/clients', icon: UserGroupIcon },
  { name: 'Tarjetas', href: '/cards', icon: CreditCardIcon },
  { name: 'KPIs', href: '/kpis', icon: ChartBarIcon },
  { name: 'FAQs', href: '/faqs', icon: QuestionMarkCircleIcon },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Componente reutilizable para la sección del logo
function LogoSection() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg">
        <img 
          src="/logo.jpeg" 
          alt="Yurni Logo" 
          className="h-12 w-12 object-contain rounded-full"
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Yurni</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Backoffice</p>
      </div>
    </div>
  );
}

function SidebarContent({ onLinkClick, showLogo = true }: { onLinkClick?: () => void; showLogo?: boolean }) {
  const location = useLocation();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
      {/* Logo y título - Solo para desktop */}
      {showLogo && (
        <div className="hidden lg:flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700 -mx-6 px-6">
          <LogoSection />
        </div>
      )}
      
      {/* Navegación */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onLinkClick}
                      className={`
                        group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 shadow-sm border-l-4 border-primary-600 dark:border-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// Componente reutilizable para el contenedor del sidebar
function SidebarContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex grow flex-col border-r border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { user } = useAuth();
  // Cerrar sidebar cuando se cambie a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint - desktop
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  // Prevenir scroll del body cuando el sidebar móvil está abierto
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [sidebarOpen]);

  // Cerrar con escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Overlay para móvil/tablet - Mejorado */}
      <div
        className={`
          fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ease-out
          ${sidebarOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar móvil/tablet - Mejorado */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 sm:w-80 transform transition-all duration-300 ease-out lg:hidden
          ${sidebarOpen 
            ? 'translate-x-0 shadow-2xl' 
            : '-translate-x-full shadow-none'
          }
        `}
      >
        <SidebarContainer className="h-full">
          {/* Header del sidebar móvil/tablet */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <LogoSection />
            
            {/* Botón de cerrar mejorado */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú de navegación"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
            </button>
          </div>
          
          {/* Contenido del sidebar */}
          <div className="flex-1 overflow-y-auto py-4">
            <SidebarContent onLinkClick={() => setSidebarOpen(false)} showLogo={false} />
          </div>
        </SidebarContainer>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <SidebarContainer>
          <SidebarContent showLogo={true} />
          {/* Empresa seleccionada abajo */}
          {user?.company && (
            <div className="mt-auto py-4 px-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Empresa:</span> {user.company.name}
            </div>
          )}
        </SidebarContainer>
      </div>
    </>
  );
}
