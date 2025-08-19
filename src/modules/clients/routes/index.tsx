import { Route } from 'react-router-dom';
import ClientsPage from '../pages/ClientsPage';

export const ClientRoutes = () => {
  return (
    <>
      <Route path="clients" element={<ClientsPage />} />
      {/* Aquí puedes agregar más rutas específicas de clientes */}
      {/* <Route path="clients/create" element={<CreateClientPage />} /> */}
      {/* <Route path="clients/:id" element={<ClientDetailPage />} /> */}
      {/* <Route path="clients/:id/edit" element={<EditClientPage />} /> */}
    </>
  );
};

export { ClientsPage };
