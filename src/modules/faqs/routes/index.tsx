import { Route } from 'react-router-dom';
import FAQsPage from '../pages/FAQsPage';

export const FAQRoutes = () => {
  return (
    <>
      <Route path="faqs" element={<FAQsPage />} />
    </>
  );
};

export { FAQsPage };
