import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  children, 
  error 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};