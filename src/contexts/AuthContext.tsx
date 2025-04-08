import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authApi } from '../lib/api';

// Types
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize from localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      isAuthenticated: !!accessToken,
      user,
      accessToken,
      refreshToken
    };
  });
  
  // Set up axios with token on initial load
  useEffect(() => {
    if (authState.accessToken) {
      configureAxios(authState.accessToken);
    }
  }, []);
  
  // Helper to update auth state
  const setAuth = (data: Partial<AuthState>) => {
    setAuthState(prev => {
      const newState = { ...prev, ...data };
      
      // Update localStorage
      if (data.user !== undefined) {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          localStorage.removeItem('user');
        }
      }
      
      if (data.accessToken !== undefined) {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        } else {
          localStorage.removeItem('accessToken');
        }
      }
      
      if (data.refreshToken !== undefined) {
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        } else {
          localStorage.removeItem('refreshToken');
        }
      }
      
      return newState;
    });
  };
  
  // Configure axios with auth token
  const configureAxios = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const response = await authApi.login({
          username: credentials.username,
          password: credentials.password
        });
        
        const { access, refresh, user_id, username, email, first_name, last_name } = response.data;
        
        // Configure axios with the new token
        configureAxios(access);
        
        // Update auth state
        setAuth({
          isAuthenticated: true,
          user: {
            id: user_id,
            username,
            email,
            first_name,
            last_name
          },
          accessToken: access,
          refreshToken: refresh,
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      toast.error('Authentication Error', {
        description: errorMessage,
      });
      throw new Error(errorMessage);
    },
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      setIsLoading(true);
      try {
        // Register the user
        await authApi.register({
          username: data.username,
          email: data.email,
          password: data.password,
          password_confirm: data.password_confirm,
          first_name: data.first_name,
          last_name: data.last_name
        });
        
        // Login after successful registration
        const loginResponse = await authApi.login({
          username: data.username, // Django Simple JWT expects username field
          password: data.password
        });
        
        const { access, refresh, user_id, username, email, first_name, last_name } = loginResponse.data;
        
        // Configure axios with the new token
        configureAxios(access);
        
        // Update auth state
        setAuth({
          isAuthenticated: true,
          user: {
            id: user_id,
            username,
            email,
            first_name,
            last_name
          },
          accessToken: access,
          refreshToken: refresh,
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err: any) => {
      let errorMessage = 'Registration failed. Please try again.';
      
      // Handle validation errors from the backend
      if (err.response?.data) {
        const errors = err.response.data;
        const errorMessages = [];
        
        // Format each field error
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errorMessages.push(`${field}: ${errors[field].join(', ')}`);
          } else if (typeof errors[field] === 'string') {
            errorMessages.push(`${field}: ${errors[field]}`);
          }
        }
        
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join('\n');
        }
      }
      
      toast.error('Registration Error', {
        description: errorMessage,
      });
      throw new Error(errorMessage);
    },
  });
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      setIsLoading(true);
      try {
        const response = await authApi.updateProfile(data);
        
        // Update user in state
        if (authState.user) {
          setAuth({
            user: { ...authState.user, ...response.data }
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data?.detail || 'Failed to update profile.';
      toast.error('Profile Update Error', {
        description: errorMessage,
      });
      throw new Error(errorMessage);
    },
  });
  
  // Logout function
  const logout = async () => {
    // Clear auth state
    setAuth({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
    });
    
    // Remove axios auth header
    configureAxios(null);
    
    // Clear related query cache
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    
    toast.success('Logged out successfully');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout,
        updateProfile: updateProfileMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
