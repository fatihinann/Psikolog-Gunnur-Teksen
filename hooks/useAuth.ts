'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    isLoading: true,
  });
  const router = useRouter();

  useEffect(() => {
    // Session storage'dan kimlik doğrulama durumunu kontrol et
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    const username = sessionStorage.getItem('adminUsername');

    if (isAuthenticated && username) {
      setAuthState({
        isAuthenticated: true,
        username,
        isLoading: false,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        username: null,
        isLoading: false,
      });
      // Admin sayfasına erişim yoksa login sayfasına yönlendir
      router.push('/auth/login');
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminUsername');
    setAuthState({
      isAuthenticated: false,
      username: null,
      isLoading: false,
    });
    router.push('/auth/login');
  };

  return {
    ...authState,
    logout,
  };
}
