import { LoginForm } from '../index';
import { useLoginHandler } from '../hooks/useLoginHandler';

export default function LoginPage() {
  const { handleLogin, isLoading } = useLoginHandler();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}