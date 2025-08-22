import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from '../services/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {theme === 'light' ? (
        <HiOutlineMoon className="h-5 w-5" />
      ) : (
        <HiOutlineSun className="h-5 w-5" />
      )}
    </button>
  );
}