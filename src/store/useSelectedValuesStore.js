import { create } from 'zustand';

const useSelectedValueStore = create((set) => ({
  agency: '',
  setAgency: (newQuery) => set({ agency: newQuery }),
  clearAgency: () => set({ agency: '' }),
  year: '',
  setYear: (newQuery) => set({ year: newQuery }),
  clearYear: () => set({ year: '' }),
  month: '',
  setMonth: (newQuery) => set({ month: newQuery }),
  clearMonth: () => set({ month: '' }),
  brand: '',
  setBrand: (newQuery) => set({ brand: newQuery }),
  clearBrand: () => set({ brand: '' }),
  mpoNum: '',
  setMpoNum: (newQuery) => set({ mpoNum: newQuery }),
  clearMpoNum: () => set({ mpoNum: '' }),
}));

export default useSelectedValueStore;