'use client';

// client/hooks/useAuth.ts
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'arats-user' | 'admin-arats';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: 'arats-user' | 'admin-arats' | null;
}

export const useAuth = () => {
  const { user: kindeUser, isAuthenticated, isLoading: kindeLoading } = useKindeBrowserClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    role: null,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (kindeLoading) return;
      
      if (!isAuthenticated || !kindeUser) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          role: null,
        });
        return;
      }

      try {
        // Fetch user data from your API
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const { user } = await response.json();
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
            role: user.role,
          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          role: null,
        });
      }
    };

    fetchUserData();
  }, [kindeUser, isAuthenticated, kindeLoading]);

  const redirectBasedOnRole = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch('/api/auth/role-redirect', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const { redirectPath } = await response.json();
        router.push(redirectPath);
      }
    } catch (error) {
      console.error('Error getting redirect path:', error);
    }
  };

  return {
    ...authState,
    redirectBasedOnRole,
  };
}; 