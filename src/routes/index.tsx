import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../shared/components';
import { ProtectedRoute, LoginPage } from '../modules/auth';
import { Dashboard } from '../modules/dashboard';
import { UsersPage } from '../modules/users';
import { ClientsPage } from '../modules/clients';
import { CardManagementPage } from '../modules/wallet';
import { KPIsPage } from '../modules/kpis';
import { FAQsPage } from '../modules/faqs';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas de autenticación (públicas) */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rutas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* Módulos */}
        <Route path="users" element={<UsersPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="cards" element={<CardManagementPage />} />
        <Route path="kpis" element={<KPIsPage />} />
        <Route path="faqs" element={<FAQsPage />} />
      </Route>

      {/* Ruta catch-all para rutas inexistentes - redirige al dashboard */}
      <Route path="*" element={
        <ProtectedRoute>
          <Navigate to="/" replace />
        </ProtectedRoute>
      } />
    </Routes>
  );
};
