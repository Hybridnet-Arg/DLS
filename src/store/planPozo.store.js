import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const usePlanPozoStore = create(
  persist(
    (set) => ({
      isLoading: false,
      planPozo: {},
      pozoActivo: {},
      setIsLoading: (isLoading) => set(() => ({ isLoading })),
      setPlanPozo: (planPozo, pozoActivo) =>
        set(() => ({ planPozo, pozoActivo, isLoading: false })),
    }),
    {
      name: 'planPozo',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
