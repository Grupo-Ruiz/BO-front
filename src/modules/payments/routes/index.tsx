import { Route } from 'react-router-dom';
import PaymentsPage from '../pages/PaymentsPage';

export const PaymentsRoutes = () => {
  return (
    <>
      <Route path="/payments" element={<PaymentsPage />} />
    </>
  );
};

export { PaymentsPage };