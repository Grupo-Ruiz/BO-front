import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
    </>
  );
};

export { LoginPage };