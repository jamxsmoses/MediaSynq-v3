import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loadingUser: false,
  userError: null,

  setUser: (userData) => set({ user: userData }),

  logout: () => set({ user: null }),
}));