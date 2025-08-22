import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../modules/shared/components';
import { ProtectedRoute, LoginPage } from '../modules/auth';
import { DashboardRoutes } from '../modules/dashboard/routes';
import { UserRoutes } from '../modules/users/routes';
import { ClientRoutes } from '../modules/clients/routes';
import { WalletRoutes } from '../modules/wallet/routes';
import { KPIRoutes } from '../modules/kpis/routes';
import { FAQRoutes } from '../modules/faqs/routes';

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
        {DashboardRoutes()}
        {UserRoutes()}
        {ClientRoutes()}
        {WalletRoutes()}
        {KPIRoutes()}
        {FAQRoutes()}
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
