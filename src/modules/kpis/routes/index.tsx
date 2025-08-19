import { Route } from 'react-router-dom';
import KPIsPage from '../pages/KPIsPage';

export const KPIRoutes = () => {
  return (
    <>
      <Route path="kpis" element={<KPIsPage />} />
      {/* Aquí puedes agregar más rutas específicas de KPIs */}
      {/* <Route path="kpis/reports" element={<KPIReportsPage />} /> */}
      {/* <Route path="kpis/analytics" element={<KPIAnalyticsPage />} /> */}
    </>
  );
};

export { KPIsPage };
