import { Route } from 'react-router-dom';
import FAQsPage from '../pages/FAQsPage';

export const FAQRoutes = () => {
  return (
    <>
      <Route path="faqs" element={<FAQsPage />} />
      {/* Aquí puedes agregar más rutas específicas de FAQs */}
      {/* <Route path="faqs/create" element={<CreateFAQPage />} /> */}
      {/* <Route path="faqs/:id/edit" element={<EditFAQPage />} /> */}
    </>
  );
};

export { FAQsPage };
