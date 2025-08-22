import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './modules/auth';

import { ThemeProvider } from './modules/shared/services/ThemeContext';
import { ModuleProviders } from './providers/ModuleProviders';
import { AppRoutes } from './routes';
import { ReduxProvider } from './providers/ReduxProvider';


function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AuthProvider>
          <ModuleProviders>
            <Router>
              <AppRoutes />
            </Router>
          </ModuleProviders>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;