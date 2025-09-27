import React from 'react';
import { useAuth } from '../context/AuthContext';

interface RoleBasedFieldProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  hideForEmployee?: boolean;
  showPlaceholder?: boolean;
  placeholderText?: string;
  className?: string;
}

const RoleBasedField: React.FC<RoleBasedFieldProps> = ({
  children,
  adminOnly = false,
  hideForEmployee = false,
  showPlaceholder = false,
  placeholderText = "Hidden",
  className = ""
}) => {
  const { user } = useAuth();

  // If no user, don't show anything
  if (!user) return null;

  // If admin only and user is not admin, hide completely
  if (adminOnly && user.role !== 'admin') {
    return null;
  }

  // If should hide for employee and user is employee
  if (hideForEmployee && user.role === 'employee') {
    if (showPlaceholder) {
      return (
        <input
          type="text"
          value={placeholderText}
          disabled
          className={`${className} bg-gray-100 text-gray-500 cursor-not-allowed`}
          readOnly
        />
      );
    }
    return null;
  }

  return <>{children}</>;
};

export default RoleBasedField; 