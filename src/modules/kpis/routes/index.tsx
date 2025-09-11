import { Route } from 'react-router-dom';
import KPIsPage from '../pages/KPIsPage';

export const KPIRoutes = () => {
  return (
    <>
      <Route path="kpis" element={<KPIsPage />} />
    </>
  );
};

export { KPIsPage };