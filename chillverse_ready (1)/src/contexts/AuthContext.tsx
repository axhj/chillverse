import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  favoriteGenres: string[];
  level: number;
  minutesListened: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('chillverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For the MVP, we'll simulate API call with mock data
      // In production, this would be an API call to your backend
      const mockUser: User = {
        id: '1',
        username: 'demo_user',
        email: email,
        avatar: `/avatars/wizard-${Math.floor(Math.random() * 5) + 1}.png`,
        favoriteGenres: ['Fantasy', 'Mystery'],
        level: 1,
        minutesListened: 0
      };
      
      setUser(mockUser);
      localStorage.setItem('chillverse_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // For the MVP, we'll simulate API call with mock data
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        avatar: `/avatars/wizard-${Math.floor(Math.random() * 5) + 1}.png`,
        favoriteGenres: [],
        level: 1,
        minutesListened: 0
      };
      
      setUser(mockUser);
      localStorage.setItem('chillverse_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chillverse_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // For the MVP, we'll update local storage directly
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('chillverse_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};