import type { ReactNode } from 'react';

export interface FilterField {
  name: string;
  label: string;
  type: 'input' | 'select';
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultOption?: { value: string; label: string } | null;
}

export interface FiltersListButton {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface FiltersListProps {
  fields: FilterField[];
  onClear?: () => void;
  buttons?: FiltersListButton[];
  className?: string;
  children?: ReactNode;
}

export function FiltersList({ fields, onClear, buttons = [], className = '', children }: FiltersListProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-4 ${className}`}>
      <form className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        {fields.map(field => (
          <div key={field.name} className="flex-1 min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{field.label}</label>
            {field.type === 'input' ? (
              <input
                type="text"
                name={field.name}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            ) : (
              <select
                name={field.name}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {field.defaultOption === undefined
                  ? <option value="">Todos</option>
                  : field.defaultOption !== null
                    ? <option value={field.defaultOption.value}>{field.defaultOption.label}</option>
                    : null}
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        {(onClear || buttons.length > 0) && (
          <div className="flex gap-2">
            {onClear && (
              <button type="button" onClick={onClear} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300 dark:border-gray-600">
                Limpiar
              </button>
            )}
            {buttons.map((btn, idx) => (
              <button
                key={btn.label + idx}
                type={btn.type || 'button'}
                onClick={btn.onClick}
                className={btn.className || 'flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition'}
              >
                {btn.icon && <span className="mr-1">{btn.icon}</span>}
                {btn.label}
              </button>
            ))}
          </div>
        )}
        {children}
      </form>
    </div>
  );
}

export default FiltersList;