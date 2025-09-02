import { Route } from 'react-router-dom';
import WalletPage from '../pages/WalletPage';

export const WalletRoutes = () => {
  return (
    <>
      <Route path="operations" element={<WalletPage />} />
    </>
  );
};

export { WalletPage };