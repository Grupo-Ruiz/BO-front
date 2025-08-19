import { Route } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';

// Para cuando necesites rutas adicionales, puedes usar este componente:
export const UserRoutes = () => (
  <>
    <Route path="users" element={<UsersPage />} />
    {/* Rutas futuras: */}
    {/* <Route path="users/create" element={<CreateUserPage />} /> */}
    {/* <Route path="users/:id" element={<UserDetailPage />} /> */}
    {/* <Route path="users/:id/edit" element={<EditUserPage />} /> */}
  </>
);

// Exportamos las páginas individuales para uso directo
export { UsersPage };
