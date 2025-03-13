import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const OU = 'OU=Sistema de Control de Horas de Bomba de lodo';
const CN = 'CN=DMS-Administracion';

/**
 * Función para obtener el tipo de bomba, la cantidad de bombas y la unidad de negocio según el id del perforador.
 * @param {string} idPerforador - ID del perforador.
 * @returns {Object} - Objeto con tipo de bomba, cantidad de bombas y unidad de negocio.
 */
function obtenerDatosPerforador(idPerforador) {
  switch (idPerforador) {
    case '156':
      return { tipoBomba: 'LEWCO', cantBombas: 2, unidadNegocio: 'SILA2' };
    case '157':
      return { tipoBomba: 'PZ', cantBombas: 2, unidadNegocio: 'SILA2' };
    case '160':
      return { tipoBomba: 'BOMCO', cantBombas: 2, unidadNegocio: 'SILA2' };
    case '174':
    case '173':
      return { tipoBomba: 'PZ2', cantBombas: 2, unidadNegocio: 'SILA2' };
    case '161':
    case '163':
      return { tipoBomba: 'FD1600S', cantBombas: 3, unidadNegocio: 'ARCNQ' };
    default:
      return { tipoBomba: 'FD1600', cantBombas: 3, unidadNegocio: 'ARCNQ' };
  }
}

const usePerforadoresStore = create(
  persist(
    (set) => ({
      perforadores: [],
      perforadorSeleccionado: null,
      cargarPerforadores: (permisos = []) => {
        const perforadores = permisos
          .filter((permiso) => permiso?.includes(OU) && !permiso?.includes(CN))
          .map((permiso) => {
            const hasta = permiso.indexOf(OU) - 9;
            const perforadorRaw = permiso.substr(8, hasta);
            const guion = perforadorRaw.indexOf('-');
            const nombre = perforadorRaw.substr(0, guion);
            const idPerforador = perforadorRaw.substr(guion - 3, 3);
            const acceso = perforadorRaw.substr(guion + 1);

            const { tipoBomba, cantBombas, unidadNegocio } =
              obtenerDatosPerforador(idPerforador);

            const distribution =
              idPerforador === '001' ? 'EQ_PAE_001' : `EQ_PERF_${idPerforador}`;

            return {
              idPerforador,
              nombre,
              acceso,
              tipoBomba,
              cantBombas,
              unidadNegocio,
              distributionType: distribution,
            };
          });

        const defaultPerforador =
          perforadores?.[0]?.nombre === 'ER'
            ? perforadores?.[1]
            : perforadores?.[0];

        return set((state) => ({
          perforadores: [...new Set(perforadores)],
          perforadorSeleccionado:
            state?.perforadorSeleccionado ?? defaultPerforador,
        }));
      },
      seleccionarPerforador: (perforador = {}) =>
        set(() => ({ perforadorSeleccionado: perforador })),
      limpiarPerforadores: () =>
        set(() => ({
          perforadores: [],
          perforadorSeleccionado: null,
        })),
    }),
    {
      name: 'perforadores',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePerforadoresStore;
