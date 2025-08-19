import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      {/* Aquí puedes agregar más rutas específicas de autenticación */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
    </>
  );
};

export { LoginPage };
