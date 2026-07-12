import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define the store with persistence
export const useThemeStore = create(
  persist(
    (set) => ({
      // Initial state
      theme: 'dark',
      
      // Actions
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // name of item in localStorage
    }
  )
);