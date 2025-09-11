import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

export const DashboardRoutes = () => {
  return (
    <>
      <Route index element={<Dashboard />} />
    </>
  );
};

export { Dashboard };