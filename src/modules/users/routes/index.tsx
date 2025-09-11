import { Route } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';

// Para cuando necesites rutas adicionales, puedes usar este componente:
export const UserRoutes = () => (
  <>
    <Route path="users" element={<UsersPage />} />
  </>
);

// Exportamos las páginas individuales para uso directo
export { UsersPage };