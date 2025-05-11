import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api-error';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  isVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: ApiError | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: ApiError }>;
  logout: () => Promise<{ success: boolean; error?: ApiError }>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: ApiError }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
  initialState?: {
    user: User | null;
    loading?: boolean;
  };
}

export function AuthProvider({ children, initialState }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialState?.user ?? null);
  const [loading, setLoading] = useState(initialState?.loading ?? true);
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!initialState) {
      checkAuth();
    }
  }, []);

  const clearError = () => setError(null);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        setError(data.error);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        router.push('/dashboard');
        return { success: true };
      }

      setError(data.error);
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login failed:', error);
      const networkError = {
        code: 'auth/network-error',
        message: 'Failed to connect to the server',
        status: 500,
      };
      setError(networkError);
      return { success: false, error: networkError };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        router.push('/dashboard');
        return { success: true };
      }

      setError(data.error);
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Registration failed:', error);
      const networkError = {
        code: 'auth/network-error',
        message: 'Failed to connect to the server',
        status: 500,
      };
      setError(networkError);
      return { success: false, error: networkError };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    clearError();

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setUser(null);
        router.push('/login');
        return { success: true };
      }

      setError(data.error);
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Logout failed:', error);
      const networkError = {
        code: 'auth/network-error',
        message: 'Failed to connect to the server',
        status: 500,
      };
      setError(networkError);
      return { success: false, error: networkError };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
