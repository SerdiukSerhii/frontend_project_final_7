import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
    getCurrentUser,
    refreshSession,
} from '@/lib/api/auth';
import type { User } from '@/types/user';

interface AuthState {
    user: User | null;
    isAuthReady: boolean;

    setUser: (user: User) => void;
    clearUser: () => void;
    setAuthReady: (isReady: boolean) => void;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            user: null,
            isAuthReady: false,

            setUser: user =>
                set({
                    user,
                    isAuthReady: true,
                }),
            
            clearUser: () =>
                set({
                    user: null,
                    isAuthReady: true,
                }),
            
            setAuthReady: isReady =>
                set({
                    isAuthReady: isReady,
                }),
            
            initializeAuth: async () => {
                set({ isAuthReady: false });

                try {
                    const user = await getCurrentUser();
                    
                    set({
                        user,
                        isAuthReady: true,
                    });
                } catch {
                    try {
                        await refreshSession();
                                                
                        const user = await getCurrentUser();
                        
                        set({
                            user,
                            isAuthReady: true,
                        });
                    } catch {
                        set({
                            user: null,
                            isAuthReady: true,
                        });
                    }
                }
            },
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