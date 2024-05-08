'use client';
import { getSession } from '@/lib/session';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | undefined;
  handleUser: (user?: User) => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleUser = (user?: User) => {
    if (user) return setUser(user);
    return setUser(undefined);
  };

  const value: AuthContextData = {
    user,
    handleUser,
  };

  useEffect(() => {
    getSession()
      .then((res) => setUser(res))
      .catch((err) => console.error(err));
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
