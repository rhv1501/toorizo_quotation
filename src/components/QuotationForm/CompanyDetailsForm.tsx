import React from 'react';
import { useFormContext } from 'react-hook-form';
import { QuotationData } from '../../types';
import { FormField } from '../ui/FormField';

const CompanyDetailsForm: React.FC = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<QuotationData>();
  
  // Watch the website field to auto-format it
  const website = watch('companyDetails.website');
  
  // Auto-format website URL when user finishes typing
  const handleWebsiteBlur = (value: string) => {
    if (value && !value.match(/^https?:\/\//)) {
      setValue('companyDetails.website', `https://${value}`);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
      
      <FormField
        label="Company Address"
        error={errors.companyDetails?.address?.message}
      >
        <textarea
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          {...register('companyDetails.address', { required: 'Company address is required' })}
        />
      </FormField>
      
      <FormField
        label="Company Phone"
        error={errors.companyDetails?.phone?.message}
      >
        <input
          type="tel"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          placeholder="e.g. +91 9876543210 or 9876543210"
          {...register('companyDetails.phone', { 
            required: 'Company phone is required',
            pattern: {
              value: /^(\+\d{1,3}[-.\s]?)?\d{8,15}$/,
              message: "Please enter a valid phone number (e.g. +91 9876543210 or 9876543210)",
            }
          })}
        />
      </FormField>
      
      <FormField
        label="Company Email"
        error={errors.companyDetails?.email?.message}
      >
        <input
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          {...register('companyDetails.email', { 
            required: 'Company email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
      </FormField>
      
      <FormField
        label="Company Website (Optional)"
        error={errors.companyDetails?.website?.message}
      >
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          placeholder="e.g. toorizo.com or https://www.toorizo.com"
          {...register('companyDetails.website', {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?([\/\w.-]*)*\/?$/,
              message: 'Please enter a valid website (e.g. toorizo.com)'
            }
          })}
          onBlur={(e) => handleWebsiteBlur(e.target.value)}
        />
      </FormField>
    </div>
  );
};

export default CompanyDetailsForm;