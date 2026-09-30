import { create } from 'zustand';
import { persist, createJSONStorage  } from 'zustand/middleware';

// 1. Define the store with persistence
export const useThemeStore = create(
  persist(
    (set) => ({
      // Initial state
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      // Actions
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme',                        // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }), // only persist theme
    }
  )
);