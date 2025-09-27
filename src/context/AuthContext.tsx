import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'employee';

export interface User {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials
const ADMIN_CREDENTIALS = [
  { email: 'toorizotravel@gmail.com', password: 'Admin123' },
  { email: 'manoj@gmail.com', password: 'Manoj123' }
];

const EMPLOYEE_CREDENTIALS = [
  { email: 'employee@toorizo.com', password: 'Employee123' }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: UserRole): boolean => {
    const credentials = role === 'admin' ? ADMIN_CREDENTIALS : EMPLOYEE_CREDENTIALS;
    
    const validCredential = credentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (validCredential) {
      const userData = { email, role };
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 