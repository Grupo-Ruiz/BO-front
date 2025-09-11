import { Route } from 'react-router-dom';
import ManagementPage from '../pages/ManagementPage';

export const ManagementRoutes = () => {
  return (
    <>
      <Route path="/management" element={<ManagementPage />} />
    </>
  );
};

export { ManagementPage };