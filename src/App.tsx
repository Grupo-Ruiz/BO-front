import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './modules/auth';
import { ThemeProvider } from './shared/services/ThemeContext';
import { ModuleProviders } from './providers/ModuleProviders';
import { AppRoutes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModuleProviders>
          <Router>
            <AppRoutes />
          </Router>
        </ModuleProviders>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;