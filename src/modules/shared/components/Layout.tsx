import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserModalProvider } from '../contexts/UserModalContext';
import { UserModalManager } from './UserModalManager';
import { Header } from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserModalProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* El padding left es 0 en móvil/tablet y pl-64 desde desktop */}
        <div className="lg:pl-64">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
        
        {/* Modal Manager */}
        <UserModalManager />
      </div>
    </UserModalProvider>
  );
}