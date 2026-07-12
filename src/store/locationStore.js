import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define the store with persistence
export const useLocationStore = create(
  persist(
    (set) => ({
      // Initial state
      location: '',
      
      // Actions
      setLocation: (location) => set({ location }),
    }),
  )
);