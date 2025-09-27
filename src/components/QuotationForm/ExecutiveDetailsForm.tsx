import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";

const executives = [
  {
    name: "Krish Jindal",
    email: "toorizotravel@gmail.com",
    phone: "+91 9940415750",
  },
  // Add more executives here as needed
];

const ExecutiveDetailsForm: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<QuotationData>();
  const selectedName = watch("executiveDetails.name");

  // Prefill email and phone when executive is selected
  React.useEffect(() => {
    const exec = executives.find((e) => e.name === selectedName);
    if (exec) {
      setValue("executiveDetails.email", exec.email);
      setValue("executiveDetails.phone", exec.phone);
    }
  }, [selectedName, setValue]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Executive Details</h3>
      <FormField
        label="Executive Name (Optional)"
        error={errors.executiveDetails?.name?.message}
      >
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          {...register("executiveDetails.name")}
        >
          <option value="">Select executive</option>
          {executives.map((exec) => (
            <option key={exec.name} value={exec.name}>
              {exec.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label="Executive Email (Optional)"
        error={errors.executiveDetails?.email?.message}
      >
        <input
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          {...register("executiveDetails.email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </FormField>
      <FormField
        label="Executive Phone Number (Optional)"
        error={errors.executiveDetails?.phone?.message}
      >
        <input
          type="tel"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          placeholder="e.g. +91 9876543210 or 9876543210"
          {...register("executiveDetails.phone", {
            pattern: {
              value: /^(\+\d{1,3}[-.\s]?)?\d{8,15}$/,
              message: "Please enter a valid phone number (e.g. +91 9876543210 or 9876543210)",
            },
          })}
        />
      </FormField>
    </div>
  );
};

export default ExecutiveDetailsForm;
