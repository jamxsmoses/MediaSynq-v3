import { create } from 'zustand';

const useYearStore = create((set) => ({
    
  year: [],
  setYear: (newQuery) => set({ query: newQuery }),
  clearYear: () => set({ query: '' }),

  
}));

export default useYearStore;