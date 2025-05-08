import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Prisma } from '@prisma/client';

import {
  getBombasEstado,
  getTopDriveEstado,
  getCableEstado,
} from '../services/planta.service';
import { obtenerWellData } from '@/services/schb/wellData.service';

export const usePlantaStore = create(
  persist(
    (set, get) => ({
      data: [],
      topDriveEstado: null,
      loading: false,
      activeSection: null,
      initial: true,
      selectedOptionMenu: null,
      lastUpdateTanques: null,
      fetchData: async (
        forceUpdate = false,
        perforadorNro,
        baja = 0,
        uso = 1
      ) => {
        if (!perforadorNro) {
          console.warn('Se debe proporcionar un número de perforador.');
          return;
        }

        if (!forceUpdate && get().data.length > 0) return;

        set({ loading: true });

        try {
          const resBombas = await getBombasEstado({
            perforador: perforadorNro,
            baja,
            uso,
          });
          const resTopDrive = await getTopDriveEstado({
            perforador: perforadorNro,
          });

          set((state) => ({
            data: resBombas,
            topDriveEstado: resTopDrive,
            loading: false,
            activeSection: null,
            initial: true,
            selectedOptionMenu: null,
          }));

          const resCable = await getCableEstado({
            perforador: perforadorNro,
          });

          set((state) => ({
            cableEstado: resCable,
          }));
        } catch (error) {
          console.error('Error al obtener datos:', error);
          set({ loading: false });
        }
      },

      setActiveSection: (active) =>
        set(() => ({ activeSection: active, initial: false })),
      setInitial: (initial) => set(() => ({ initial: initial })),
      setSetSelectedOptionMenu: (value) =>
        set(() => ({ selectedOptionMenu: value })),
      getLastUpdateTanques: async ({ idPerforador }) => {
        const params = {
          limit: 1,
          sort_field: 'fecha',
          sort_type: Prisma.SortOrder.desc,
        };
        if (idPerforador) {
          params.perforador = idPerforador;
        }
        const data = await obtenerWellData(params);

        set(() => ({ lastUpdateTanques: data?.[0]?.fecha }));
      },
    }),
    {
      name: 'planta',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
