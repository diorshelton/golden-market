import { useState, useEffect } from 'react';
import { authService } from "../services/api";
import type  {ReactNode} from "react";
import { AuthContext } from '../hooks/useAuth';

interface User {
  id: number;
  username: string;
  email: string;
  coins: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const accessToken = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');

      if (accessToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.clear();
        }
      }

      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });

    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setUser(data.user);
  };

  const register = async (username: string, email: string, password: string) => {
    const data = await authService.register({ username, email, password });

    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setUser(data.user);
  };

  const logout = () => {
    authService.logout().catch(console.error);

    localStorage.clear();
    setUser(null);
  };

  return (
      <AuthContext.Provider
        value=
			{{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				register,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

