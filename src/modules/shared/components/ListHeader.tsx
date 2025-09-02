import React from 'react';

export interface ListHeaderField {
  type: 'input' | 'select';
  name: string;
  label: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface ListHeaderProps {
  title: string;
  fields: ListHeaderField[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onNew: () => void;
  newLabel: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ title, fields, values, onChange, onNew, newLabel }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4 flex flex-col md:flex-row md:items-end md:gap-4">
      <div className="flex-1 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="flex flex-wrap gap-4">
          {fields.map(field => (
            <div key={field.name} className="flex flex-col min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {field.type === 'input' ? (
                <input
                  type="text"
                  name={field.name}
                  value={values[field.name] || ''}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || ''}
                  className="border px-2 py-1 rounded-lg"
                />
              ) : (
                <select
                  name={field.name}
                  value={values[field.name] || ''}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded-lg"
                >
                  <option value="">Todos</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow"
        onClick={onNew}
      >
        {newLabel}
      </button>
    </div>
  );
};

export default ListHeader;
