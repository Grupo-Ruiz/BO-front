import { Route } from 'react-router-dom';
import WalletPage from '../pages/WalletPage';

export const WalletRoutes = () => {
  return (
    <>
      <Route path="/wallet" element={<WalletPage />} />
    </>
  );
};

export { WalletPage };