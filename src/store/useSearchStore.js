import { create } from 'zustand';

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (newQuery) => set({ query: newQuery }),
  clearQuery: () => set({ query: '' }),
}));

export default useSearchStore;