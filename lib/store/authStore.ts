import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

interface AuthState {
    user: User | null;
    isAuthReady: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
    setAuthReady: (isReady: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
        user: null,
        isAuthReady: false,

        setUser: user => set({ user }),

        clearUser: () => set({ user: null }),

        setAuthReady: isReady => set({ isAuthReady: isReady }),
        }),
        {
        name: 'harmoniq-auth',
        skipHydration: true,
        partialize: state => ({
            user: state.user,
        }),
        },
    ),
);