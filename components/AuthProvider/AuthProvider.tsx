'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { refreshSession } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

let initializationPromise: Promise<void> | null = null;

const initializeAuth = () => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await useAuthStore.persist.rehydrate();

      const { user, clearUser, setAuthReady } = useAuthStore.getState();

      if (user) {
        try {
          await refreshSession();
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            clearUser();
          }
        }
      }

      setAuthReady(true);
    })();
  }

  return initializationPromise;
};

const AuthProvider = ({ children }: Props) => {
  useEffect(() => {
    void initializeAuth();
  }, []);

  return children;
};

export default AuthProvider;