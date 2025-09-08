import type { ReactNode } from 'react';
import { Modal, Button } from '@/modules/shared/components';

export interface ModalFormField {
  name: string;
  label: string;
  type?: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  placeholder?: string;
  icon?: ReactNode;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  autoComplete?: string;
}

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: ModalFormField[];
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function ModalForm({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  loading = false,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  children,
  footer
}: ModalFormProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {fields.map(field => (
            <div key={field.name}>
              {field.type === 'select' ? (
                <>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{field.label}</label>
                  <select
                    name={field.name}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    disabled={field.disabled}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {field.error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{field.error}</p>}
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{field.label}</label>
                  <div className="relative">
                    {field.icon && <span className="absolute left-3 top-3">{field.icon}</span>}
                    <input
                      name={field.name}
                      type={field.type || 'text'}
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      autoComplete={field.autoComplete}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${field.icon ? 'pl-10' : ''}`}
                    />
                  </div>
                  {field.error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{field.error}</p>}
                </>
              )}
            </div>
          ))}
          {children}
        </div>
        {footer || (
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
            <Button type="submit" variant="primary" loading={loading} disabled={loading}>{submitLabel}</Button>
          </div>
        )}
      </form>
    </Modal>
  );
}

export default ModalForm;