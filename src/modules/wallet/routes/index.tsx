import { Route } from 'react-router-dom';
import CardManagementPage from '../pages/CardManagementPage';

export const WalletRoutes = () => {
  return (
    <>
      <Route path="cards" element={<CardManagementPage />} />
      {/* Aquí puedes agregar más rutas específicas de wallet/tarjetas */}
      {/* <Route path="wallet" element={<WalletOverviewPage />} /> */}
      {/* <Route path="cards/create" element={<CreateCardPage />} /> */}
      {/* <Route path="cards/:id" element={<CardDetailPage />} /> */}
    </>
  );
};

export { CardManagementPage };
