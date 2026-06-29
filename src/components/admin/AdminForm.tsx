'use client';

import { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'textarea' | 'select';
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string | number }>;
  rows?: number;
  allowEmpty?: boolean;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  options,
  rows = 4,
  allowEmpty = false,
}: FormFieldProps) {
  const inputClasses =
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-(--main-color) disabled:bg-gray-100 disabled:cursor-not-allowed ' +
    (error ? 'border-red-500' : 'border-gray-300');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={inputClasses}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={inputClasses}
        >
          {allowEmpty && <option value="">Selecione uma opção</option>}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface AdminFormProps {
  title: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  children: ReactNode;
  isLoading?: boolean;
  submitText?: string;
}

export default function AdminForm({
  title,
  onSubmit,
  onCancel,
  children,
  isLoading = false,
  submitText = 'Salvar',
}: AdminFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-(--main-dark-color) mb-6">{title}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        {children}

        <div className="flex gap-4 justify-end mt-8">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-(--main-color) text-white rounded-lg hover:bg-(--main-light-color) transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
