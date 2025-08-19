import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

export const DashboardRoutes = () => {
  return (
    <>
      <Route index element={<Dashboard />} />
      {/* Aquí puedes agregar más rutas específicas del dashboard */}
      {/* <Route path="dashboard/analytics" element={<DashboardAnalyticsPage />} /> */}
    </>
  );
};

export { Dashboard };
