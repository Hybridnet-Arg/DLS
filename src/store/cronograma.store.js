import { create } from 'zustand';

export const useCronogramaStore = create((set) => ({
  tareasForescastPendientes: [],
  addTareaForescastPendiente: (tareaForecast) =>
    set((state) => ({
      tareasForescastPendientes: [
        ...state.tareasForescastPendientes,
        tareaForecast,
      ],
    })),
  removeTareaForescastPendiente: (fecha) =>
    set((state) => ({
      tareasForescastPendientes: state.tareasForescastPendientes.filter(
        (tareaForecastPendiente) =>
          tareaForecastPendiente?.fecha.getTime() !== fecha.getTime()
      ),
    })),
  clearCronogramaStore: () => set({ tareasForescastPendientes: [] }),
}));
